"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/userSlice";
import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { logoutAction } from "@/actions/auth.actions";

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    startTransition(async () => {
      const response = await logoutAction();
      if (response.success) {
        dispatch(logoutUser()); // Update Redux
        router.push("/auth/signin"); // Redirect after logout
      }
    });
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-secondary transition-colors cursor-pointer text-red-600"
      disabled={isPending}
    >
      <LogOut className="h-4 w-4" />
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
