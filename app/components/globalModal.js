// components/globalModal.js

'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Utility to generate random ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export default function GlobalModal({ id = generateId(), onClose, onMinimize, children }) {
  const [minimized, setMinimized] = useState(false);

  const handleMinimize = () => {
    setMinimized(true);
    onMinimize(id);
  };

  const handleClose = () => {
    onClose(id);
  };

  if (minimized) return null;

  return (
    <div
      className="fixed top-20 left-1/2 z-50 w-[500px] -translate-x-1/2 rounded-md bg-white shadow-lg border border-gray-300 p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">🌀 Modal {id.slice(-4)}</span>
        <div className="space-x-2">
          <button onClick={handleMinimize}>❐</button>
          <button onClick={handleClose}>❌</button>
        </div>
      </div>
      <div className="h-40 overflow-auto">{children}</div>
    </div>
  );
}

GlobalModal.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onMinimize: PropTypes.func.isRequired,
  children: PropTypes.node
};
