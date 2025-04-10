// app/rbac/components/pageCard.js

"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function PageCard({ id, title }) {
  // Hook for drag behavior
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  // Visual transformation when dragging
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    border: "1px solid #ccc",
    padding: "0.75rem",
    margin: "0.5rem",
    background: "white",
    borderRadius: "6px",
    cursor: "grab",
    textAlign: "center",
    fontSize: "0.9rem",
    width: "120px",
    boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.1)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {title}
    </div>
  );
}
