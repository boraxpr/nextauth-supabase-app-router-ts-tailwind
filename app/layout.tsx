import "./globals.css";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

import { ScrollToTopButton } from "@/components/scrollToTop";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Providers from "@/components/Providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "RD",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen bg-muted font-sans antialiased ${inter.className}`
        )}
      >
        <Providers>
          <ScrollArea>
            <div className="w-screen h-screen flex flex-col relative">
              <NavBar />
              <main className="flex-1 relative">{children}</main>
            </div>
          </ScrollArea>

          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
