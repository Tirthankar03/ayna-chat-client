import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/services/user-me-loader";

export async function middleware(request: NextRequest) {
  
  
  
  const user = await getUserMeLoader();

  console.log('user in middleware>>>>>', user)
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/chat") && user.ok === false) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (currentPath.startsWith("/auth/signin") && user.ok === true) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }



  return NextResponse.next();
}
