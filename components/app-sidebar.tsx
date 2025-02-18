import { fetchUserSessions } from "@/lib/api";
import { AppSidebarClient } from "./app-sidebar-client";
import { Suspense } from "react";

interface AppSidebarProps {
  sessionId: string | undefined; // Define the type for sessionId
  [key: string]: any; // To handle other props if needed
}

export async function AppSidebar({ sessionId, ...props }: AppSidebarProps) {
  // Fetch data server-side
  const sessions = await fetchUserSessions();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppSidebarClient sessions={sessions} currentSessionId={sessionId} />
    </Suspense>
  );
}
