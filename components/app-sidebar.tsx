'use client'
import * as React from "react";
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MessageCircle, Plus, SeparatorHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { DeleteDialog } from '@/components/delete-dialog';
import { EditDialog } from '@/components/edit-dialog';

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Recent Chats",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
          isActive: true,
        },
      ],
    },
  ],
};

const dummyData = [
  {
    id: '1',
    title: 'Chat Session 1',
    updated_at: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Chat Session 2',
    updated_at: '2024-03-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Chat Session 3',
    updated_at: '2024-03-13T09:20:00Z'
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [currentSession, setCurrentSession] = useState<string>('1');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<{id: string, title: string} | null>(null);
  
  const handleDeleteSession = (id: string) => {
    // Dummy delete handler
    console.log('Delete session:', id);
    setDeleteDialogOpen(false);
  };

  const handleRenameSession = (id: string, newTitle: string) => {
    // Dummy rename handler
    console.log('Rename session:', id, 'new title:', newTitle);
    setEditDialogOpen(false);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex-col  items-center justify-between p-2 border-b-2">
          <div className="flex mt-2 items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold">Ayna Chat</span>
          </div>

          {/* add hover effect here */}
          <div className="mt-6 mb-3 bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all cursor-pointer text-white text-sm px-2 py-3 gap-2 rounded-md flex  items-center">
            <Plus className="h-4 w-4" />
            <p>New Chat</p>
          </div>
        </div>
      </SidebarHeader>
      {/* add a seperator here */}
      <SidebarContent>
                 <SidebarGroup>
            <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
              {dummyData.map((session) => (
          <div
            key={session.id}
            className={clsx(
              'flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100',
              currentSession === session.id && 'bg-primary/20 hover:bg-primary/20'
            )}
            onClick={() => setCurrentSession(session.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.title}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(session.updated_at), 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSession({ id: session.id, title: session.title });
                setEditDialogOpen(true);
              }}
              className="text-gray-400 hover:text-muted-foreground"
            >
              <Edit className="h-4 w-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSession({ id: session.id, title: session.title });
                setDeleteDialogOpen(true);
              }}
              className="text-gray-400 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            </div>

          </div>
        ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      
      <DeleteDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => selectedSession && handleDeleteSession(selectedSession.id)}
        sessionTitle={selectedSession?.title}
      />
      
      <EditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onConfirm={(newTitle) => selectedSession && handleRenameSession(selectedSession.id, newTitle)}
        initialTitle={selectedSession?.title}
      />
    </Sidebar>
  );
}
