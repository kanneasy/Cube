// Screen projection, in one place.
//
// This exists because it was wrong and the tests could not see it. The renderer
// projected a direction and negated its y; the gesture test's mock renderer computed
// the same direction against the camera's up vector and did not. Both looked reasonable
// in isolation, the mock encoded the convention the code was SUPPOSED to have, and
// nineteen gesture tests passed against a projection the app did not actually use.
//
// The consequence on a real phone: every drag with a vertical component turned the
// wrong way. Horizontal drags were fine, because only y carried the sign error, so the
// bottom layer behaved and the top and side faces -- which need vertical drag -- did not.
//
// One function now, used by the renderer and by the tests, with the convention stated
// once and asserted against a real camera.

import type { Camera, Quaternion } from 'three';
import { Vector2, Vector3 } from 'three';

const a = new Vector3();
const b = new Vector3();

/**
 * Where a direction at `origin` points on screen, as a unit vector with **+y UP**.
 *
 * `Vector3.project` returns normalised device coordinates, which are already +y up.
 * Negating that y was the bug; nothing here should reintroduce it.
 *
 * `orientation`, when given, is the cube's own rotation — positions and directions are
 * expressed in the cube's frame, so a free trackball orbit has to be applied before
 * projecting or every drag resolves against a cube that is no longer where it was.
 */
export function projectDirection(
  camera: Camera,
  origin: readonly [number, number, number],
  direction: readonly [number, number, number],
  orientation?: Quaternion,
  /** Pass false to keep the projected magnitude, which the turn gain needs. */
  normalise = true,
): Vector2 {
  a.set(origin[0], origin[1], origin[2]);
  b.set(origin[0] + direction[0], origin[1] + direction[1], origin[2] + direction[2]);
  if (orientation) {
    a.applyQuaternion(orientation);
    b.applyQuaternion(orientation);
  }
  a.project(camera);
  b.project(camera);
  const v = new Vector2(b.x - a.x, b.y - a.y);
  return normalise ? v.normalize() : v;
}
