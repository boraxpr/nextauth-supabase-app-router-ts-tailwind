import { SBServerClient } from "@/utils/server/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema } from "../schemas/auth";
import { ServerActionResult } from "@/types/server";
import {
  createServerActionAuthError,
  createServerActionValidationError,
} from "@/utils/server/actions";

export async function getSession() {
  "use server";
  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function signIn(data: {
  email: string;
  password: string;
}): Promise<ServerActionResult> {
  "use server";
  const validate = signInSchema.safeParse(data);

  if (!validate.success)
    return createServerActionValidationError(validate.error);

  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword(validate.data);

  if (error) return createServerActionAuthError();

  return { status: "success" };
}

export async function signOut(): Promise<ServerActionResult> {
  "use server";
  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  await supabase.auth.signOut();
  return { status: "success" };
}
