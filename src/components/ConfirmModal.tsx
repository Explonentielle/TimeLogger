"use client"

import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmMessage: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  confirmMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-80 z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
      <p className="text-gray-900 dark:text-gray-100 mb-4">{confirmMessage}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
  );
};
