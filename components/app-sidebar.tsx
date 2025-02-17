

import { fetchUserSessions } from "@/lib/api";
import { AppSidebarClient } from "./app-sidebar-client";
import { Suspense } from "react";

export async function AppSidebar({ sessionId, ...props }) {
  // Fetch data server-side
  const sessions = await fetchUserSessions();


  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppSidebarClient sessions={sessions} currentSessionId={sessionId} />
    </Suspense>
  );}
