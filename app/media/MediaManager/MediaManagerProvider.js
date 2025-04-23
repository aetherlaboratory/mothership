'use client';

import React, { createContext, useState, useCallback } from 'react';
import { getAllMedia } from '@/app/media/mediaActions';

// ✅ Context object
export const MediaManagerContext = createContext();

// ✅ Provider component
export function MediaManagerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);              // Modal state
  const [selectedMedia, setSelectedMedia] = useState(null); // Media selection
  const [mediaItems, setMediaItems] = useState([]);         // Media list
  const [loading, setLoading] = useState(false);            // Loading state
  const [onSelectCallback, setOnSelectCallback] = useState(null); // ✅ Callback for insert

  // ✅ Open modal and optionally pass a callback
  const openModal = useCallback((callback) => {
    setOnSelectCallback(() => callback || null);
    setIsOpen(true);
  }, []);

  // ✅ Close modal and reset state
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedMedia(null);
    setOnSelectCallback(null);
  }, []);

  // ✅ Select media and trigger callback
  const selectMedia = useCallback((media) => {
    setSelectedMedia(media);

    // ✅ If a callback was provided, run it and close the modal
    if (onSelectCallback && media?.source_url) {
      onSelectCallback(media.source_url);
      closeModal();
    }
  }, [onSelectCallback, closeModal]);

  // ✅ Load media list from WordPress
  const refreshMediaLibrary = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMedia({ per_page: 40 });
      setMediaItems(data);
    } catch (err) {
      console.error('❌ Failed to refresh media:', err);
    }
    setLoading(false);
  }, []);

  return (
    <MediaManagerContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        selectedMedia,
        selectMedia,
        mediaItems,
        refreshMediaLibrary,
        loading,
      }}
    >
      {children}
    </MediaManagerContext.Provider>
  );
}
