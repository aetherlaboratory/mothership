// components/siteFooter.js

'use client';
import { useModalManager } from './modalManager';

export default function SiteFooter() {
  const { modals, restoreModal, createModal } = useModalManager();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black/90 text-white px-4 py-2 flex items-center justify-between z-40">
      <div className="flex items-center gap-2 overflow-x-auto max-w-[90%]">
        {modals
          .filter((modal) => modal.minimized)
          .map((modal) => (
            <div
              key={modal.id}
              className="relative group cursor-pointer bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
              onClick={() => restoreModal(modal.id)}
            >
              <span className="text-sm">🧊 {modal.id.slice(-4)}</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white text-black text-xs rounded shadow-md p-2 w-40 z-50">
                <p className="truncate">🧪 Preview Placeholder</p>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => createModal(<p className="text-center">🔧 New Blank Modal</p>)}
        className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-sm rounded"
      >
        + New Modal
      </button>
    </footer>
  );
}
