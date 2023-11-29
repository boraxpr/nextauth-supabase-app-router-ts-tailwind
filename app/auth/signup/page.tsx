import { redirect } from "next/navigation";
import SignUpClient from "./client";
import { getSession, signUp } from "@/server/actions/auth";
export default async function SignUp() {
  const session = await getSession();
  if (session) {
    return redirect("/");
  }
  return <SignUpClient signUpFn={signUp} />;
}
