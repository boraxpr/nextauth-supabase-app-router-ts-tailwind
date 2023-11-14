import { GeistSans } from 'geist/font'
import './globals.css'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'RD',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const username = session?.user?.email?.split('@')[0];


  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        {session ? (
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <span>
                <a href="/account">{username}</a>
              </span>
              <button>
                <a href="/projects">Projects</a>
              </button>
              <form action="/auth/signout" method="post">
                <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover" type="submit">
                  Sign out
                </button>
              </form>

            </div>
          </nav>
        ) : null}
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html >
  )
}
