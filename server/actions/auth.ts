import { SBServerClient } from "@/utils/server/supabase";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "../schemas/auth";
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

export async function signIn(data: SignInSchema): Promise<ServerActionResult> {
  "use server";
  const validate = signInSchema.safeParse(data);

  if (!validate.success)
    return createServerActionValidationError(validate.error);

  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword(validate.data);

  if (error) return createServerActionAuthError(error.message);

  return { status: "success" };
}

export async function signOut(): Promise<ServerActionResult> {
  "use server";
  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  await supabase.auth.signOut();
  return { status: "success" };
}

export async function signUp(data: SignUpSchema): Promise<ServerActionResult> {
  "use server";

  const validate = signUpSchema.safeParse(data);

  if (!validate.success)
    return createServerActionValidationError(validate.error);

  if (validate.data.password !== validate.data.confirmPassword)
    return createServerActionValidationError([
      {
        field: "confirmPassword",
        message: "Passwords do not match.",
      },
    ]);

  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = SBServerClient(cookieStore);
  const { error } = await supabase.auth.signUp({
    email: validate.data.email,
    password: validate.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return createServerActionAuthError(error.message);

  return { status: "success" };
}
