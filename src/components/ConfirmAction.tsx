"use client";

import { useState } from "react";
import { ActionConfirm } from "@/src/features/git/class/ActionConfirm";
import { ConfirmModal } from "@/src/components/ConfirmModal";

interface ConfirmActionProps {
  onConfirm: () => void;
  confirmMessage: string;
}

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  onConfirm,
  confirmMessage,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={() => {
          onConfirm();
          handleCloseConfirm();
        }}
        confirmMessage={confirmMessage}
      />
    </>
  );
};