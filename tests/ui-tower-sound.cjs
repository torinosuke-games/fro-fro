const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/ui/tower-sound.js'), 'utf8');
function setup(options = {}) {
  const stat = { contexts: 0, oscillators: [], listeners: {}, resumes: 0 };
  function param() { return { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {} }; }
  class AC {
    constructor() { stat.contexts++; this.state = options.suspended ? 'suspended' : 'running'; this.currentTime = 1; stat.ctx = this; }
    createGain() { return { gain: param(), connect() {}, disconnect() {} }; }
    createDynamicsCompressor() { return { threshold: param(), knee: param(), ratio: param(), attack: param(), release: param(), connect() {} }; }
    createOscillator() {
      const o = { frequency: param(), connect() {}, disconnect() {}, start(t) { this.startTime = t; }, stop(t) { this.stopTime = t; } };
      stat.oscillators.push(o); return o;
    }
    resume() { stat.resumes++; return Promise.reject(new Error('blocked')); }
  }
  const root = { FF: { app: { state: { settings: { sound: options.enabled !== false } } } }, document: { addEventListener(n, fn) { stat.listeners[n] = fn; } } };
  if (!options.unsupported) root[options.webkit ? 'webkitAudioContext' : 'AudioContext'] = AC;
  vm.runInNewContext(source, root);
  return { root, stat, api: root.FF.towerSound };
}
const names = ['place', 'hit', 'kill', 'coreHit', 'light', 'win', 'lose', 'wave'];
const a = setup();
assert.deepEqual(Object.keys(a.api).sort(), names.slice().sort());
for (const n of names) { const s = setup(); s.api[n](); assert(s.stat.oscillators.length > 0, n); for (const o of s.stat.oscillators) assert(o.stopTime > o.startTime); }
const muted = setup({ enabled: false }); names.forEach(n => muted.api[n]()); Object.values(muted.stat.listeners).forEach(fn => fn()); assert.equal(muted.stat.contexts, 0);
const hit = setup(); for (let i = 0; i < 100; i++) hit.api.hit(); assert.equal(hit.stat.oscillators.length, 1);
const capped = setup(); for (let i = 0; i < 100; i++) { capped.stat.ctx && (capped.stat.ctx.currentTime += 2); names.forEach(n => capped.api[n]()); } assert.equal(capped.stat.oscillators.length, 24);
capped.stat.oscillators.forEach(o => o.onended()); capped.stat.ctx.currentTime += 2; capped.api.place(); assert.equal(capped.stat.oscillators.length, 25);
const locked = setup({ suspended: true }); names.forEach(n => locked.api[n]()); assert.equal(locked.stat.oscillators.length, 0); locked.stat.ctx.state = 'running'; locked.api.hit(); assert.equal(locked.stat.oscillators.length, 1);
const unsupported = setup({ unsupported: true }); names.forEach(n => unsupported.api[n]());
const legacy = setup({ webkit: true }); legacy.api.wave(); assert(legacy.stat.oscillators.length > 0);
console.log('PASS: eight APIs, mute, hit throttling, voice cap/cleanup, suspended context, missing API, webkit fallback');
