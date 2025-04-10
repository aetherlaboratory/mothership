// /app/loading/trackedFetch.js

import { registerTask, markTaskDone } from './loadingManager';

// trackedFetch is a wrapper around the native fetch API.
// It registers a loading task by ID (and optional weight) before the fetch starts,
// then marks it as complete when the response finishes.
export async function trackedFetch(url, options = {}, taskId = null, weight = 1) {
  // Use the taskId (if provided) to track loading state
  if (taskId) {
    registerTask(taskId, weight);
  }

  try {
    // Start the actual fetch
    const response = await fetch(url, options);

    // Mark task as done after successful response
    if (taskId) {
      markTaskDone(taskId);
    }

    // Return the original response
    return response;
  } catch (error) {
    // If fetch fails, we still mark it done to prevent freezing the loader
    if (taskId) {
      markTaskDone(taskId);
    }
    throw error;
  }
}
