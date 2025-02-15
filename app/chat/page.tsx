'use client'
import { AppSidebar } from "@/components/app-sidebar"
import PlusButton from "@/components/plus-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div className="flex gap-2 items-center ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className=" h-4" />
            <PlusButton/>
          </div>
          
          {/* <ProfileDialog /> */}


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
              <div className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-secondary transition-colors cursor-pointer text-red-600">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

          
        </header>
        <div className="flex flex-1 flex-col">
          <ChatArea />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
