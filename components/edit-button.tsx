'use client';

import React, { useState, useTransition } from "react";
import { Edit } from 'lucide-react';
import { EditDialog } from '@/components/edit-dialog';
import { renameChatSession } from '@/actions/session.actions';

interface EditSessionButtonProps {
  sessionId: string;
  initialTitle: string;
}

export function EditSessionButton({ sessionId, initialTitle }: EditSessionButtonProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleRenameSession = async (newTitle: string) => {
    startTransition(async () => {
      try {
        await renameChatSession(sessionId, newTitle);
        setEditDialogOpen(false);
      } catch (err) {
        setError('Failed to rename session');
      }
    });
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditDialogOpen(true);
        }}
        className="text-gray-400 hover:text-muted-foreground"
        disabled={isPending}
      >
        <Edit className="h-4 w-4" />
      </button>

      <EditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onConfirm={handleRenameSession}
        initialTitle={initialTitle}
      />
    </>
  );
}
