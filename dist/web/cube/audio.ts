// Sound, because there is no touch.
//
// iOS Safari has no vibration API, so motion and sound carry the entire tactile
// burden. Everything is synthesised in Web Audio rather than shipped as samples: the
// PWA stays small, and more importantly every strike can vary. Without per-strike
// variation, twenty turns in a row read as a machine beeping.
//
// The governing rule: sound means the puzzle changed. Orbiting the view is silent.

const dbToGain = (db: number): number => 10 ** (db / 20);

export class CubeAudio {
  private context: AudioContext | null = null;
  private enabled = true;

  /**
   * iOS will not start an AudioContext without a user gesture, and a silent first turn
   * is a broken first impression. Called from the very first touch of the session.
   */
  unlock(): void {
    if (!this.enabled) return;
    if (!this.context) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) {
        this.enabled = false;
        return;
      }
      this.context = new Ctor();
    }
    if (this.context.state === 'suspended') void this.context.resume();
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  private noiseBuffer(durationMs: number): AudioBuffer | null {
    const ctx = this.context;
    if (!ctx) return null;
    const length = Math.max(1, Math.floor((ctx.sampleRate * durationMs) / 1000));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  /**
   * The detent. Crossing a 45-degree boundary is the moment the nearest quarter turn
   * changes, and this is the difference between dragging a shape and turning a
   * mechanism. Very quiet on purpose.
   */
  tick(): void {
    const ctx = this.context;
    if (!ctx || !this.enabled) return;
    const buffer = this.noiseBuffer(8);
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3100;
    filter.Q.value = 6;
    const gain = ctx.createGain();
    gain.gain.value = dbToGain(-26);

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  }

  /**
   * The clack, fired while the layer is still moving rather than on arrival. Three
   * layers: a transient that gives it an edge, a body that gives it material, and a
   * low thud that gives it weight on a phone speaker.
   */
  clack(): void {
    const ctx = this.context;
    if (!ctx || !this.enabled) return;
    const t = ctx.currentTime;
    // Per-strike variation. Without it, a fast solve sounds like a machine.
    const centre = 1900 * (1 + (Math.random() - 0.5) * 0.18);
    const trim = dbToGain((Math.random() - 0.5) * 3);

    const out = ctx.createGain();
    out.gain.value = trim;
    out.connect(ctx.destination);

    // Transient: 3ms sine at 4200Hz.
    const tr = ctx.createOscillator();
    tr.frequency.value = 4200;
    const trGain = ctx.createGain();
    trGain.gain.setValueAtTime(dbToGain(-20), t);
    trGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.003);
    tr.connect(trGain).connect(out);
    tr.start(t);
    tr.stop(t + 0.004);

    // Body: 18ms of bandpassed noise decaying over 55ms.
    const buffer = this.noiseBuffer(18);
    if (buffer) {
      const body = ctx.createBufferSource();
      body.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = centre;
      bp.Q.value = 1.4;
      const bodyGain = ctx.createGain();
      bodyGain.gain.setValueAtTime(dbToGain(-14), t);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
      body.connect(bp).connect(bodyGain).connect(out);
      body.start(t);
    }

    // Thud: 40ms at 168Hz.
    const thud = ctx.createOscillator();
    thud.frequency.value = 168;
    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(dbToGain(-18), t);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    thud.connect(thudGain).connect(out);
    thud.start(t);
    thud.stop(t + 0.045);
  }

  /**
   * A refused drag. Deliberately duller and quieter than the clack: it is the sound of
   * something not moving.
   */
  thunk(): void {
    const ctx = this.context;
    if (!ctx || !this.enabled) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.frequency.value = 120;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 400;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(dbToGain(-24), t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    osc.connect(lp).connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }
}
