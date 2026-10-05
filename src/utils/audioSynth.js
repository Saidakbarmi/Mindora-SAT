/**
 * MINDORA Atmospheric Sound Synthesizer
 * Built with Web Audio API (No external audio file dependencies needed).
 * Generates calm nature soundscapes: Forest, Rain, Ocean, Night.
 */

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.currentMode = null;
    this.nodes = [];
    this.masterGain = null;
    this.isPlaying = false;
    this.volume = 0.5;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  stop() {
    if (this.nodes.length) {
      this.nodes.forEach(n => {
        try {
          if (n.stop) n.stop();
          if (n.disconnect) n.disconnect();
        } catch (e) {
          // Ignore clean-up error
        }
      });
      this.nodes = [];
    }
    this.isPlaying = false;
    this.currentMode = null;
  }

  createPinkNoiseNode() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07;
      b6 = white * 0.115926;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
  }

  playForest() {
    this.init();
    this.stop();
    this.currentMode = 'forest';
    this.isPlaying = true;

    // Gentle wind breeze (low-pass filtered noise with LFO)
    const noise = this.createPinkNoiseNode();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO for swaying trees
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime); // slow wave
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();
    this.nodes.push(noise, filter, lfo, lfoGain, gain);
  }

  playRain() {
    this.init();
    this.stop();
    this.currentMode = 'rain';
    this.isPlaying = true;

    // Soft pitter-patter rain
    const noise = this.createPinkNoiseNode();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    this.nodes.push(noise, filter, gain);
  }

  playOcean() {
    this.init();
    this.stop();
    this.currentMode = 'ocean';
    this.isPlaying = true;

    // Ocean swell waves
    const noise = this.createPinkNoiseNode();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);

    const swellGain = this.ctx.createGain();
    swellGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    // Sine LFO for cyclic wave tide
    const waveLfo = this.ctx.createOscillator();
    waveLfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave period
    const waveDepth = this.ctx.createGain();
    waveDepth.gain.setValueAtTime(0.14, this.ctx.currentTime);
    waveLfo.connect(waveDepth);
    waveDepth.connect(swellGain.gain);

    noise.connect(filter);
    filter.connect(swellGain);
    swellGain.connect(this.masterGain);

    noise.start();
    waveLfo.start();
    this.nodes.push(noise, filter, swellGain, waveLfo, waveDepth);
  }

  playNight() {
    this.init();
    this.stop();
    this.currentMode = 'night';
    this.isPlaying = true;

    // Deep calm night hum
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(92, this.ctx.currentTime);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    const noise = this.createPinkNoiseNode();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4500, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    osc.start();
    noise.start();
    this.nodes.push(osc, oscGain, noise, filter, noiseGain);
  }

  toggle(mode) {
    if (this.isPlaying && this.currentMode === mode) {
      this.stop();
      return false;
    } else {
      if (mode === 'forest') this.playForest();
      else if (mode === 'rain') this.playRain();
      else if (mode === 'ocean') this.playOcean();
      else if (mode === 'night') this.playNight();
      return true;
    }
  }
}

export const ambientEngine = new AmbientSoundEngine();
