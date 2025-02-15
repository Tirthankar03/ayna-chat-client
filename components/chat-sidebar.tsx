import * as React from "react"
import { format } from "date-fns"
import { MessageCircle, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
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
} from "@/components/ui/sidebar"

interface ChatSession {
  id: string
  title: string
  updated_at: string
}

const sampleSessions: ChatSession[] = [
  {
    id: "1",
    title: "Chat Session 1",
    updated_at: new Date().toISOString(),
  },
  // Add more sample sessions as needed
]

export function ChatSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold">Chat App</span>
          </div>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sampleSessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton className="justify-between">
                    <span className="truncate">{session.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(session.updated_at), "MMM d")}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Delete chat</span>
                      </Button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
} 