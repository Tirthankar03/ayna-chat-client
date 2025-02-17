"use client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/actions/user.actions";

export function ProfileDialog() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [formData, setFormData] = React.useState({
    username: user?.username || "",
  });

  const [isPending, startTransition] = React.useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ username: e.target.value });
  };

  const handleSaveChanges = () => {
    startTransition(async () => {
      try {
        const updatedUser = await updateUserProfile(formData.username);
        dispatch(setUser(updatedUser.data)); // Update Redux state
        alert("Profile updated successfully!");
      } catch (error) {
        alert("Failed to update profile");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>Profile</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges} disabled={isPending}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
