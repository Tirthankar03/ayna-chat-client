'use client';

import React, { useState, useTransition } from "react";
import { Trash2 } from 'lucide-react';
import { DeleteDialog } from '@/components/delete-dialog';
import { deleteChatSession } from '@/actions/session.actions';

interface DeleteSessionButtonProps {
  sessionId: string;
  sessionTitle: string;
}

export function DeleteSessionButton({ sessionId, sessionTitle }: DeleteSessionButtonProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleDeleteSession = async () => {
    startTransition(async () => {
      try {
        await deleteChatSession(sessionId);
        setDeleteDialogOpen(false);
      } catch (err) {
        setError('Failed to delete session');
      }
    });
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDeleteDialogOpen(true);
        }}
        className="text-gray-400 hover:text-destructive"
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteSession}
        sessionTitle={sessionTitle}
      />
    </>
  );
}
