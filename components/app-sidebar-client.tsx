'use client';

import React, { useState, useTransition } from "react";
import { format } from 'date-fns';
import { MessageCircle, Plus } from 'lucide-react';
import clsx from 'clsx';
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarRail } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { createChatSession } from '@/actions/session.actions';
import { EditSessionButton } from "./edit-button";
import { DeleteSessionButton } from "./delete-button";
import { Session } from "@/lib/types";




interface AppSidebarClientProps extends React.ComponentProps<typeof Sidebar> {
  sessions: Session[];
  currentSessionId: string;
}

export function AppSidebarClient({ currentSessionId, sessions, ...props }: AppSidebarClientProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleCreateSession = async () => {
    startTransition(async () => {
      try {
        await createChatSession();
      } catch (err) {
        setError('Failed to create new session');
      }
    });
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex-col items-center justify-between p-2 border-b-2">
          <div className="flex mt-2 items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold">Ayna Chat</span>
          </div>

          <Button
            onClick={handleCreateSession}
            disabled={isPending}
            className="mt-6 mb-3 w-full bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all cursor-pointer text-white text-sm px-2 py-3 gap-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4" />
            <p>{isPending ? 'Creating...' : 'New Chat'}</p>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {error && <div className="p-3 text-sm text-destructive">{error}</div>}

              {sessions.map((session) => (
                <div key={session.id} className={clsx(
                  'flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer',
                  session.documentId == currentSessionId && 'bg-primary/20 hover:bg-primary/20',
                  isPending && 'opacity-50'
                )}>
                  <Link href={`/chat2?id=${session.documentId}`} className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{session.title}</p>
                    <p className="text-xs text-gray-500">{format(new Date(session.updatedAt), 'MMM d, yyyy')}</p>
                  </Link>

                  <div className="flex gap-2 justify-center items-center">
                    <EditSessionButton sessionId={session.documentId} initialTitle={session.title} />
                    <DeleteSessionButton sessionId={session.documentId} sessionTitle={session.title} />
                  </div>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
