import "./globals.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import AuthButton from "@/components/AuthButton";
import SideMenu from "@/components/SideMenu";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "RD",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
        <nav className="w-full grid grid-cols-3 border-b border-b-foreground/10 h-16 shadow-md ">
          <div className="flex justify-start m-2">
            {session && <SideMenu />}
          </div>
          <div className="w-full max-w-4xl flex justify-center items-center p-3 text-sm">
            <>
              {session && (
                <span>
                  Hello,
                  <a href="/account" className="font-extrabold">
                    {" "}
                    {username}
                  </a>{" "}
                  !
                </span>
              )}
            </>
          </div>
          <div className="m-2">
            {session ? (
              <div className="flex items-center justify-end gap-4">
                <form action={signOut}>
                  <button className="py-2 px-24 rounded-md no-underline border bg-primary text-primary-foreground">
                    Signout
                  </button>
                </form>
              </div>) : (<div className="flex items-center justify-end gap-4">
                <Link
                  href="/login"
                  className="py-2 px-24 rounded-md no-underline bg-primary text-primary-foreground"
                >
                  Login
                </Link>
              </div >)
            }
          </div>
        </nav>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
