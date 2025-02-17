import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/ReduxProvider";
import { getUserMeLoader } from "@/services/user-me-loader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user data on the server (HTTP-only cookies are available here)
  const userResponse = await getUserMeLoader();
  const initialUser = userResponse.ok ? userResponse.data : null;

  // console.log('user in the api call>>>>>>', userResponse)

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider initialUser={initialUser}>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
