// /app/loading/loadingManager.js

// Global state for loading tasks
let loadingTasks = {}; // Each task will be { id: string, weight: number, completed: boolean }

// Array of callback functions to notify listeners of loading progress
const subscribers = [];

// Register a loading task with a unique ID and optional weight (default: 1)
export function registerTask(id, weight = 1) {
  if (!loadingTasks[id]) {
    loadingTasks[id] = { weight, completed: false };
    notifySubscribers(); // Update any UI or logic subscribed to loading state
  }
}

// Mark a task as completed by its ID
export function markTaskDone(id) {
  if (loadingTasks[id] && !loadingTasks[id].completed) {
    loadingTasks[id].completed = true;
    notifySubscribers();
  }
}

// Reset all tasks (used when switching pages, layouts, etc.)
export function resetTasks() {
  loadingTasks = {};
  notifySubscribers();
}

// Calculate current loading progress (0–100%) based on weights
export function getLoadingProgress() {
  let total = 0;
  let done = 0;

  for (const id in loadingTasks) {
    const task = loadingTasks[id];
    total += task.weight;
    if (task.completed) {
      done += task.weight;
    }
  }

  const percent = total === 0 ? 100 : Math.floor((done / total) * 100);

  return {
    percent,
    loaded: done,
    total,
    remaining: total - done,
    isComplete: percent === 100,
  };
}

// Subscribe to loading changes (used by UI or transitions)
export function subscribeToLoadingChanges(callback) {
  if (typeof callback === 'function') {
    subscribers.push(callback);
  }

  // Return an unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) subscribers.splice(index, 1);
  };
}

// Notify all subscribers with current loading progress
function notifySubscribers() {
  const state = getLoadingProgress();
  subscribers.forEach((cb) => cb(state));
}



// DEBUGGING: Expose to browser console
if (typeof window !== 'undefined') {
  window.debugLoadingTasks = function () {
    console.log('--- Registered Loading Tasks ---');
    Object.entries(loadingTasks).forEach(([id, task]) => {
      if (!task.completed) {
        console.warn(`❌ NOT DONE: ${id} (weight: ${task.weight})`);
      } else {
        console.log(`✅ DONE: ${id}`);
      }
    });
  };
}
