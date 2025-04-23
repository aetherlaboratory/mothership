// app/form/components/StepEditor.js

'use client'

import { useState } from 'react'
import { Trash2, Plus, GripVertical } from 'lucide-react'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from './SortableItem' // You must create this component to handle drag handles

export default function StepEditor({ steps, setSteps, currentStepIndex, setCurrentStepIndex }) {
  const sensors = useSensors(useSensor(PointerSensor))

  const addStep = () => {
    const newStep = {
      title: `Step ${steps.length + 1}`,
      conditional: { field: '', value: '', logic: 'equals' },
      fields: [],
    }
    setSteps([...steps, newStep])
    setCurrentStepIndex(steps.length)
  }

  const removeStep = (index) => {
    if (steps.length <= 1) return
    const updated = [...steps]
    updated.splice(index, 1)
    setSteps(updated)
    setCurrentStepIndex(0)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = steps.findIndex((_, i) => `step-${i}` === active.id)
    const newIndex = steps.findIndex((_, i) => `step-${i}` === over.id)
    const newSteps = arrayMove(steps, oldIndex, newIndex)
    setSteps(newSteps)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Steps</h2>
        <button
          onClick={addStep}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          <Plus className="w-4 h-4 inline-block mr-1" /> Add Step
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map((_, i) => `step-${i}`)} strategy={verticalListSortingStrategy}>
          {steps.map((step, index) => (
            <SortableItem key={`step-${index}`} id={`step-${index}`}>
              <div
                className={`p-3 border rounded cursor-pointer ${
                  currentStepIndex === index ? 'bg-blue-50 border-blue-400' : 'bg-white'
                }`}
                onClick={() => setCurrentStepIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <strong>{step.title}</strong>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeStep(index)
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
