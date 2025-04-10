// components/modalManager.js

'use client';
import { useState, createContext, useContext } from 'react';
import GlobalModal from './globalModal';

// Context for access in other components (like footer)
const ModalContext = createContext();

export const useModalManager = () => useContext(ModalContext);

export default function ModalManager({ children }) {
  const [modals, setModals] = useState([]);

  // Add a new modal with blank content (can customize later)
  const createModal = (content = null) => {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    setModals((prev) => [...prev, { id, content, minimized: false }]);
  };

  // Close modal by ID
  const closeModal = (id) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  // Minimize modal by ID
  const minimizeModal = (id) => {
    setModals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, minimized: true } : m))
    );
  };

  // Restore a minimized modal
  const restoreModal = (id) => {
    setModals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, minimized: false } : m))
    );
  };

  return (
    <ModalContext.Provider value={{ modals, createModal, restoreModal }}>
      {modals.map((modal) =>
        !modal.minimized ? (
          <GlobalModal
            key={modal.id}
            id={modal.id}
            onClose={closeModal}
            onMinimize={minimizeModal}
          >
            {modal.content}
          </GlobalModal>
        ) : null
      )}

      {children}
    </ModalContext.Provider>
  );
}
