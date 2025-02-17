// 'use client';

// import React, { useState, useTransition } from "react";
// import { format } from 'date-fns';
// import { Edit, Trash2, MessageCircle, Plus } from 'lucide-react';
// import clsx from 'clsx';
// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, 
//   SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarRail } from "@/components/ui/sidebar";
// import { Button } from "./ui/button";
// import { DeleteDialog } from '@/components/delete-dialog';
// import { EditDialog } from '@/components/edit-dialog';
// import { createChatSession, deleteChatSession, renameChatSession } from '@/actions/session.actions';
// import Link from "next/link";

// interface Session {
//   id: string;
//   title: string;
//   updated_at: string;
// }

// interface AppSidebarClientProps extends React.ComponentProps<typeof Sidebar> {
//   sessions: Session[];
//   currentSessionId: string
// }

// export function AppSidebarClient({ currentSessionId ,sessions, ...props }: AppSidebarClientProps) {

//     console.log("sessions>>>>", sessions)
//     console.log("currentSessionId>>>>", currentSessionId)
//   // const [currentSession, setCurrentSession] = useState('');
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedSession, setSelectedSession] = useState<{id: string, title: string} | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState('');
  

//   const handleCreateSession = async () => {
//     startTransition(async () => {
//       try {
//         const newSession = await createChatSession('New Chat');

//         console.log("newSession>>>>>>", newSession)
//         // if (newSession?.data) {
//         //   setCurrentSession(newSession.data.id);
//         // }
//       } catch (err) {
//         setError('Failed to create new session');
//         console.log('err in create session>>>>', err)
//       }
//     });
//   };

//   const handleDeleteSession = async (id: string) => {
//     startTransition(async () => {
//       try {
//         await deleteChatSession(id);
//         // setSessions(prev => prev.filter(session => session.id !== id));
//         setDeleteDialogOpen(false);
//         // if (currentSession === id) {
//         //   setCurrentSession(sessions[0]?.id || '');
//         // }
//       } catch (err) {
//         setError('Failed to delete session');
//       }
//     });
//   };


// const handleRenameSession = async (id: string, newTitle: string) => {

//     console.log("handle rename>>>>>>>>>", id, newTitle);
//     startTransition(async () => {
//       try {
//         await renameChatSession(id, newTitle);
//         setEditDialogOpen(false);
//       } catch (err) {
//         setError('Failed to rename session');
//       }
//     });
//   };

//   return (
//     <Sidebar {...props}>
//       <SidebarHeader>
//         <div className="flex-col items-center justify-between p-2 border-b-2">
//           <div className="flex mt-2 items-center gap-2">
//             <MessageCircle className="h-5 w-5" />
//             <span className="font-semibold">Ayna Chat</span>
//           </div>

//           <Button 
//             onClick={handleCreateSession}
//             disabled={isPending}
//             className="mt-6 mb-3 w-full bg-primary text-primary-foreground shadow hover:bg-primary/90 
//               transition-all cursor-pointer text-white text-sm px-2 py-3 gap-2 rounded-md flex items-center"
//           >
//             <Plus className="h-4 w-4" />
//             <p>{isPending ? 'Creating...' : 'New Chat'}</p>
//           </Button>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>
//             Recent Chats
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {error && (
//                 <div className="p-3 text-sm text-destructive">{error}</div>
//               )}
              
//               {sessions.map((session) => (
//                 <Link href={`/chat2?id=${session.id}`}
//                   key={session.id}
//                   className={clsx(
//                     'flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100',
//                     session.id == currentSessionId && 'bg-primary/20 hover:bg-primary/20',
//                     isPending && 'opacity-50'
//                   )}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {session.title}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {format(new Date(session.updated_at), 'MMM d, yyyy')}
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-2 justify-center items-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedSession({ id: session.id, title: session.title });
//                         setEditDialogOpen(true);
//                       }}
//                       className="text-gray-400 hover:text-muted-foreground"
//                       disabled={isPending}
//                     >
//                       <Edit className="h-4 w-4" />
//                     </button>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedSession({ id: session.id, title: session.title });
//                         setDeleteDialogOpen(true);
//                       }}
//                       className="text-gray-400 hover:text-destructive"
//                       disabled={isPending}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </Link>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
      
//       <SidebarRail />
      
//       <DeleteDialog 
//         open={deleteDialogOpen}
//         onOpenChange={setDeleteDialogOpen}
//         onConfirm={() => selectedSession && handleDeleteSession(selectedSession.id)}
//         sessionTitle={selectedSession?.title}
//       />
      
//       <EditDialog
//         open={editDialogOpen}
//         onOpenChange={setEditDialogOpen}
//         onConfirm={(newTitle) => selectedSession && handleRenameSession(selectedSession.id, newTitle)}
//         initialTitle={selectedSession?.title}
//       />
//     </Sidebar>
//   );
// }


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
