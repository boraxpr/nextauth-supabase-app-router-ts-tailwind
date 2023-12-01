import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ScrollToTopButton } from "@/components/scrollToTop";
import { ReactNode } from "react";
import NavBar from "@/components/nav/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Providers from "@/components/Providers";
import { baseUrl } from "@/utils/server";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "Index Page | Sphere Accounts",
  description:
    "Sphere Accounts is a simple accounts app built with Next.js and Supabase.",
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
