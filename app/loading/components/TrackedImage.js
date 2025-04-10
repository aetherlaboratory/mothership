'use client';

import React, { useEffect, useRef } from 'react';
import { registerTask, markTaskDone } from '../loadingManager';

export default function TrackedImage({ src, alt, taskId, weight = 1, className = '' }) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src || !taskId) return;

    registerTask(taskId, weight);

    const img = new Image();
    img.src = src;

    if (img.complete) {
      console.log(`[ALREADY LOADED] ${taskId}`);
      markTaskDone(taskId);
    } else {
      img.onload = () => {
        console.log(`[LOADED] ${taskId}`);
        markTaskDone(taskId);
      };
      img.onerror = () => {
        console.warn(`[ERROR] ${taskId}`);
        markTaskDone(taskId);
      };
    }
  }, [src, taskId]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}
