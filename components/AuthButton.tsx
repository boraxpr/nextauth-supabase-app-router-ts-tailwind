import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center justify-end gap-4">
      <form action={signOut}>
        <button className="py-2 px-24 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border ">
          Signout
        </button>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-end gap-4">
      <Link
        href="/login"
        className="py-2 px-24 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border "
      >
        Login
      </Link>
    </div >
  )
}
