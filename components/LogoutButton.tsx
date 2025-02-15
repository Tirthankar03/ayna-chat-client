import { LogOut } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

async function logoutAction() {
  "use server";
  const cookiesStore = await cookies();
  cookiesStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/auth/signin");
}

export function LogoutButton() {
  return (
    <form action={logoutAction} className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-secondary transition-colors cursor-pointer text-red-600">
      <button type="submit" className="flex gap-2 justify-center items-center" >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
    </form>
  );
}
