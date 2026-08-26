import { describe, it, expect } from 'vitest';
import { PerspectiveCamera, Quaternion, Vector3 } from 'three';
import { projectDirection } from './project';
import { DEFAULT_PITCH, DEFAULT_YAW } from './renderer';

/** The app's real default camera. A three.js camera needs no WebGL context. */
function defaultCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(28, 390 / 524, 0.1, 100);
  const distance = 12;
  const cp = Math.cos(DEFAULT_PITCH);
  camera.position.set(distance * cp * Math.sin(DEFAULT_YAW), distance * Math.sin(DEFAULT_PITCH), distance * cp * Math.cos(DEFAULT_YAW));
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();
  return camera;
}

describe('screen projection', () => {
  const camera = defaultCamera();

  // The bug this module exists for. If y is ever negated again, this is what fails.
  it('puts world up on screen up', () => {
    const v = projectDirection(camera, [0, 0, 0], [0, 1, 0]);
    expect(v.y).toBeGreaterThan(0.5);
  });

  it('puts world down on screen down', () => {
    expect(projectDirection(camera, [0, 0, 0], [0, -1, 0]).y).toBeLessThan(-0.5);
  });

  it('puts the camera-facing right-hand direction on screen right', () => {
    // From azimuth +45 the world +x axis leans to the right of the screen.
    expect(projectDirection(camera, [0, 0, 0], [1, 0, 0]).x).toBeGreaterThan(0);
  });

  it('puts world -x on screen left', () => {
    expect(projectDirection(camera, [0, 0, 0], [-1, 0, 0]).x).toBeLessThan(0);
  });

  it('returns a unit vector', () => {
    const v = projectDirection(camera, [1, 1, 1], [0, 1, 0]);
    expect(Math.hypot(v.x, v.y)).toBeCloseTo(1, 5);
  });

  it('reverses when the direction reverses', () => {
    const up = projectDirection(camera, [1, 1, 1], [0, 1, 0]);
    const down = projectDirection(camera, [1, 1, 1], [0, -1, 0]);
    expect(up.x).toBeCloseTo(-down.x, 5);
    expect(up.y).toBeCloseTo(-down.y, 5);
  });

  it('applies the cube orientation before projecting', () => {
    // Turn the cube a half turn about Y: what pointed +x now points -x, so its screen
    // direction has to flip. Without this the trackball would resolve every drag
    // against a cube that has since rotated away.
    const flipped = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);
    const plain = projectDirection(camera, [0, 0, 0], [1, 0, 0]);
    const turned = projectDirection(camera, [0, 0, 0], [1, 0, 0], flipped);
    expect(Math.sign(turned.x)).toBe(-Math.sign(plain.x));
  });
});
