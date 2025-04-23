'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs' // Replace with your tab system
import NormalFieldsTab from './NormalFieldsTab'
import AdvancedFieldsTab from './AdvancedFieldsTab'
import PostTypeFieldsTab from './PostTypeFieldsTab'

export default function AddFieldModal({ isOpen, onClose, onFieldSelect }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative w-screen h-screen !max-w-none !max-h-none bg-white rounded-none shadow-none overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-700 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="h-full w-full flex flex-col">
          {/* Tab headers */}
          <Tabs defaultValue="normal" className="w-full flex flex-col h-full">
            <TabsList className="flex border-b">
              <TabsTrigger value="normal">Normal Fields</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Fields</TabsTrigger>
              <TabsTrigger value="post">Post Type Fields</TabsTrigger>
            </TabsList>

            <TabsContent value="normal" className="flex-1 overflow-auto p-4">
              <NormalFieldsTab onSelect={onFieldSelect} />
            </TabsContent>

            <TabsContent value="advanced" className="flex-1 overflow-auto p-4">
              <AdvancedFieldsTab onSelect={onFieldSelect} />
            </TabsContent>

            <TabsContent value="post" className="flex-1 overflow-auto p-4">
              <PostTypeFieldsTab onSelect={onFieldSelect} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
