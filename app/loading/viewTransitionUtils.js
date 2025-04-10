// /app/loading/viewTransitionUtils.js

// Safely runs a view transition if supported by the browser.
// This is useful for wrapping navigation or UI changes with smooth transitions.
// For example: startViewTransition(() => router.push('/profile'))

export function startViewTransition(callback) {
  // Check if browser supports view transitions (e.g. Chrome 111+ or React 19 support)
  if (document && document.startViewTransition) {
    // Native API exists, use it
    document.startViewTransition(callback);
  } else {
    // Fallback: just call the function immediately
    callback();
  }
}

// Optional helper to delay a view transition until loading is complete
// You can use this to wait for full page data/assets to load before triggering animation
export async function viewTransitionAfterLoading(callback, waitForLoadingProgress) {
  const state = waitForLoadingProgress();

  // If already 100%, transition immediately
  if (state.percent === 100) {
    return startViewTransition(callback);
  }

  // Otherwise, poll loading progress until 100% then transition
  const interval = setInterval(() => {
    const current = waitForLoadingProgress();
    if (current.percent === 100) {
      clearInterval(interval);
      startViewTransition(callback);
    }
  }, 100); // Check every 100ms
}
