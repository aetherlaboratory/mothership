// app/lib/amplitudeWrapper.js

let amplitudeInstance = null;

export const initAmplitudePlayer = async (songs = []) => {
  if (typeof window === 'undefined' || !window.Amplitude) return;

  // 🧹 Fully destroy previous player
  if (window.Amplitude && window.Amplitude.stop) {
    window.Amplitude.stop(); // stop any current audio
  }
  if (document.getElementById('amplitude-player')) {
    const container = document.getElementById('amplitude-player');
    container.innerHTML = ''; // remove controls if reinit
  }

  window.Amplitude.init({ songs });

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const loaded = window.Amplitude.getSongs?.()?.length;
      if (loaded) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
};
