// Tiny 8-bit sound synth built on the Web Audio API (no audio files).
// Muted by default; the HUD toggles it.

let ctx = null;
let enabled = false;

export function setSoundEnabled(on) {
  enabled = on;
}

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(c, { freq, to, start = 0, dur = 0.08, type = 'square', vol = 0.04 }) {
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

const arpeggio = (notes, step, extra = {}) =>
  notes.map((freq, i) => ({ freq, start: i * step, dur: step + 0.04, ...extra }));

const SOUNDS = {
  hover: [{ freq: 1200, dur: 0.025, vol: 0.012 }],
  click: [{ freq: 440, to: 880, dur: 0.06, vol: 0.03 }],
  jump: [{ freq: 300, to: 700, dur: 0.12, vol: 0.04 }],
  pop: [
    { freq: 700, to: 90, dur: 0.18, type: 'triangle', vol: 0.07 },
    { freq: 1400, to: 300, dur: 0.07, vol: 0.02 },
  ],
  coin: [
    { freq: 988, dur: 0.08 },
    { freq: 1319, start: 0.08, dur: 0.28 },
  ],
  start: arpeggio([523, 659, 784, 1047], 0.09),
  achievement: arpeggio([659, 784, 988, 1319], 0.07, { type: 'triangle', vol: 0.05 }),
  secret: arpeggio([523, 659, 784, 1047, 784, 1047, 1319, 1568], 0.08),
};

export function playSound(name, { force = false } = {}) {
  if (!enabled && !force) return;
  const c = getContext();
  if (!c) return;
  SOUNDS[name]?.forEach((s) => tone(c, s));
}
