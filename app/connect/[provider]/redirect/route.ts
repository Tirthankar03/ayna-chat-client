import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(
  request: Request,
  params: any
) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const provider = params.params.provider;
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const path = `/api/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  const res = await fetch(url.href);
  const data = await res.json();

  const cookiesStore = await cookies();
  cookiesStore.set("jwt", data.jwt, config);

  return NextResponse.redirect(new URL("/chat", request.url));
}
