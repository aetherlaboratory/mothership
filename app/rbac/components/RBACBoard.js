// app/rbac/components/rbacBoard.js

"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { ROLE_LABELS } from "../utils/roleMap";
import RoleColumn from "./roleColumn";
import PageCard from "./pageCard";
import unassignedItems from "../utils/unassignedItems";

// Initial RBAC assignment layout
const initialAssignments = {
  4: [
    { id: "dashboard", title: "Dashboard" },
    { id: "settings", title: "Settings" },
  ],
  3: [
    { id: "crud", title: "CRUD Manager" },
    { id: "uploads", title: "Uploads" },
  ],
  2: [
    { id: "profile", title: "Profile Page" },
    { id: "cart", title: "Shopping Cart" },
  ],
  1: [
    { id: "home", title: "Home" },
    { id: "login", title: "Login Page" },
  ],
  0: unassignedItems,
};

export default function RBACBoard() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [lastSavedAssignments, setLastSavedAssignments] = useState(initialAssignments);

  const sensors = useSensors(useSensor(PointerSensor));

  const findItemAndLevel = (id) => {
    for (const [level, items] of Object.entries(assignments)) {
      const item = items.find((i) => i.id === id);
      if (item) return { item, fromLevel: Number(level) };
    }
    return null;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const source = findItemAndLevel(active.id);
    const destinationLevel = Number(over.id.replace("role-", ""));

    if (source.fromLevel === destinationLevel) return;

    setAssignments((prev) => {
      const newAssignments = { ...prev };
      newAssignments[source.fromLevel] = newAssignments[source.fromLevel].filter(
        (i) => i.id !== source.item.id
      );
      newAssignments[destinationLevel] = [
        ...newAssignments[destinationLevel],
        source.item,
      ];
      return newAssignments;
    });
  };

  const handleSave = () => {
    // Store the current assignments as saved state
    setLastSavedAssignments(assignments);

    // You could send this to a backend or localStorage
    console.log("✅ RBAC saved:", assignments);
    alert("RBAC access settings saved successfully.");
  };

  const handleUndo = () => {
    setAssignments(lastSavedAssignments);
    alert("Changes reverted to last saved state.");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "2rem" }}>
        🎛️ Role-Based Access Assignment Board
      </h1>

      {/* Buttons */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "0.6rem 1.2rem",
            marginRight: "1rem",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          💾 Save Changes
        </button>

        <button
          onClick={handleUndo}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ↩️ Undo Changes
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Main Role Columns */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
          {[4, 3, 2, 1].map((level) => (
            <RoleColumn
              key={level}
              roleLevel={level}
              items={assignments[level]}
            />
          ))}
        </div>

        {/* Unassigned Items */}
        {assignments[0]?.length > 0 && (
  <div className="bg-gray-900 py-8 px-4 mt-12 rounded-md shadow-inner"  style={{ paddingBottom: "6rem" }}>
            <h1 className="text-white text-lg" style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "2rem" }}>
              🆕 Unassigned Pages & Components
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "1rem",
                justifyContent: "center",
                padding: "0 2rem",
              }}
            >
              {assignments[0].map((page) => (
                <PageCard key={page.id} id={page.id} title={page.title} />
              ))}
            </div>
          </div>
        )}
      </DndContext>
    </div>
  );
}
