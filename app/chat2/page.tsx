
import { AppSidebar } from "@/components/app-sidebar"
import PlusButton from "@/components/plus-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Plus, UserCircle, LogOut } from "lucide-react"
import { ProfileDialog } from "@/components/profile-dialog"
import { ChatArea } from "@/components/chat-area"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogoutButton } from "@/components/LogoutButton"

export default  function Page({searchParams} : {searchParams: {id: string}}) {
    const {id} =  searchParams;
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
            <Avatar>
              <AvatarFallback className="bg-primary/30 cursor-pointer">T</AvatarFallback>
            </Avatar>
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
          <ChatArea sessionId={id}/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
