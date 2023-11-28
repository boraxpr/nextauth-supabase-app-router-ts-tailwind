import "./globals.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import SideMenu from "@/components/SideMenu";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScrollToTopButton } from "@/components/scrollToTop";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "RD",
  description: "The fastest way to build apps with Next.js and Supabase",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const username = session?.user?.email?.split("@")[0];
  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <nav className="w-full grid grid-cols-3 border-b border-b-foreground/10 h-16 shadow-md">
          <div className="m-2 w-2/4">
            {session && <SideMenu />}
          </div>
          <div className="m-2 text-sm flex flex-row justify-center items-center overflow-hidden">
            {session && (
              <span>
                Hello,
                <a href="/account" className="font-extrabold ">
                  {" "}
                  {username}
                </a>{" "}
                !
              </span>
            )}
          </div>
          <div className="flex flex-row justify-end m-2">
            {session ? (
              <form action={signOut}>
                <button className="rounded-md no-underline border bg-primary text-primary-foreground p-2">
                  Signout
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-md no-underline bg-primary border text-primary-foreground "
              >
                Login
              </Link>
            )
            }
          </div>
        </nav>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
