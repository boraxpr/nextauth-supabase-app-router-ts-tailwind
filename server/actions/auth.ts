import { SBServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  "use server";
  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function signOut() {
  "use server";
  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  supabase.auth.signOut();
  return redirect("/auth/signin");
}
