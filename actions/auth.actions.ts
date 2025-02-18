// server/logout.ts
"use server";

import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function logoutAction() {
    const cookiesStore = await cookies();
  cookiesStore.set("jwt", "", { ...config, maxAge: 0 });

  return { success: true };
}
