// app/rbac/components/roleColumn.js

"use client";

import { useDroppable } from "@dnd-kit/core";
import PageCard from "./pageCard";
import { ROLE_LABELS } from "../utils/roleMap";

// Map each role level to a color
const roleBgColors = {
  4: "#6b7280", // Admin (gray-500)
  3: "#9ca3af", // Content Creator (gray-400)
  2: "#d1d5db", // Logged In (gray-300)
  1: "#e5e7eb", // Guest (gray-200)
};

export default function RoleColumn({ roleLevel, items }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `role-${roleLevel}`,
  });

  const columnStyle = {
    flex: 1,
    minHeight: "400px",
    margin: "0.5rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: isOver ? "#cfeafe" : roleBgColors[roleLevel],
    transition: "background-color 0.2s ease-in-out",
    border: "2px dashed #e5e7eb",
  };

  const titleStyle = {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: roleLevel > 2 ? "white" : "#1f2937", // darker text for lighter backgrounds
  };

  return (
    <div ref={setNodeRef} style={columnStyle}>
      <h2 style={titleStyle}>
        {ROLE_LABELS[roleLevel]} <br />
        <span style={{ fontSize: "0.8rem" }}>Level {roleLevel}</span>
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((page) => (
          <PageCard key={page.id} id={page.id} title={page.title} />
        ))}
      </div>
    </div>
  );
}
