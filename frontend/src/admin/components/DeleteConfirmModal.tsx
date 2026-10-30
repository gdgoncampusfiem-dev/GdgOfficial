import React from 'react';
import { X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  title,
  itemName,
  onConfirm,
  onCancel
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div 
        className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl p-5 text-gray-900 shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm tracking-tight uppercase font-sans text-gray-900">{title}</h3>
          <button
            onClick={onCancel}
            className="p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed font-sans">
          Are you sure you want to permanently delete <span className="text-gray-950 font-semibold">"{itemName}"</span>? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-150 font-sans">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-black rounded-lg border border-gray-200 hover:bg-gray-50 font-sans"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-xs text-white bg-red-600 hover:bg-red-700 rounded-lg font-sans font-medium shadow-sm"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
