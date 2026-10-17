// src/components/common/ConfirmDialog.jsx
import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = "Confirm Action", message, confirmText = "Delete", isDeleting = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center space-y-4 py-2">
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-slate-300 text-sm">{message}</p>
        
        <div className="flex items-center gap-3 w-full pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
