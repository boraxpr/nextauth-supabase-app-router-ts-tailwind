import { getSession, signIn } from "@/server/actions/auth";
import SignInClient from "./client";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect("/");
  }
  return <SignInClient signInFn={signIn} />;
}
