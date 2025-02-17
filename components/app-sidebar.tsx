//need refinement=> all server component except the new chat button itself


import { fetchUserSessions } from "@/lib/api";
import { AppSidebarClient } from "./app-sidebar-client";
import { Suspense } from "react";

export async function AppSidebar({ sessionId, ...props }) {
  // Fetch data server-side
  const sessions = await fetchUserSessions();

  console.log("sessions>>>>", sessions)
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppSidebarClient sessions={sessions} currentSessionId={sessionId} />
    </Suspense>
  );}
