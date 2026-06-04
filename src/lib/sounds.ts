let audioCtx: AudioContext | null = null;
let isMuted = typeof window !== 'undefined' ? localStorage.getItem('portfolio_muted') === 'true' : false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function getMuteState() {
  return isMuted;
}

export function toggleMute() {
  isMuted = !isMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_muted', isMuted ? 'true' : 'false');
  }
  return isMuted;
}

export function playClickSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(523.25, time); // C5
    osc.frequency.exponentialRampToValueAtTime(130.81, time + 0.08); // C3
    
    gain.gain.setValueAtTime(0.03, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.09);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playCoinSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, time); // B5
    osc.frequency.setValueAtTime(1318.51, time + 0.08); // E6
    
    gain.gain.setValueAtTime(0.03, time);
    gain.gain.setValueAtTime(0.03, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.26);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playOpenSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, time); // C5
    osc.frequency.setValueAtTime(659.25, time + 0.04); // E5
    osc.frequency.setValueAtTime(783.99, time + 0.08); // G5
    osc.frequency.setValueAtTime(1046.50, time + 0.12); // C6
    
    gain.gain.setValueAtTime(0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.26);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}

export function playCloseSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1046.50, time); // C6
    osc.frequency.setValueAtTime(783.99, time + 0.04); // G5
    osc.frequency.setValueAtTime(659.25, time + 0.08); // E5
    osc.frequency.setValueAtTime(523.25, time + 0.12); // C5
    
    gain.gain.setValueAtTime(0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.26);
  } catch (e) {
    console.warn('Audio failed to play', e);
  }
}
