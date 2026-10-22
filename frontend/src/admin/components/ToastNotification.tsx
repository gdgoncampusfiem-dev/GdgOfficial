import React from 'react';
import { useAdmin } from '../AdminContext';

export function ToastNotification() {
  const { toastMessage } = useAdmin();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg text-xs font-sans font-medium shadow-md">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span>{toastMessage}</span>
    </div>
  );
}
