
import { AppSidebar } from "@/components/app-sidebar"
import PlusButton from "@/components/plus-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Plus, UserCircle, LogOut, MessageCircle } from "lucide-react"
import { ProfileDialog } from "@/components/profile-dialog"
import { ChatArea } from "@/components/chat-area"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogoutButton } from "@/components/LogoutButton"
import { getMessagesBySessionId } from "@/lib/api"
import AvatarUser from "@/components/AvatarUser"
import Template from "@/components/Template"

interface PageProps {
  searchParams: {
    id?: string;
  };
}

export default async  function Page({searchParams} : any) {
    const {id} =  searchParams;

    console.log("id>>>>", id)

let messages = [];
if (id) {
  try {
    messages = await getMessagesBySessionId(id);
  } catch (err) {
    console.error("Error fetching messages:", err);
    messages = []; // Fallback if there is an error
  }
}
    // console.log("messages>>>>", messages)
  return (
    <SidebarProvider>
      <AppSidebar sessionId={id}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div className="flex gap-2 items-center ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className=" h-4" />
            <PlusButton/>
          </div>
          



        <Popover>
          <PopoverTrigger>
            <AvatarUser/>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col gap-3 ">
              <div className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
                <UserCircle className="h-4 w-4" />
                <ProfileDialog />
              </div>
              <Separator />
              <LogoutButton/>
            </div>
          </PopoverContent>
        </Popover>

          
        </header>
        <div className="flex flex-1 flex-col">
          {id != undefined ? <ChatArea sessionId={id} messages={messages}/> : <Template/> }

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
