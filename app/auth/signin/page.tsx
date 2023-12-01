import { signIn } from "@/server/actions/auth";
import SignInClient from "./client";

export const metadata = {
  title: "Sign In | Sphere Accounts",
};

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function SignIn(props: Props) {
  return (
    <SignInClient
      signInFn={signIn}
      callbackUrl={props.searchParams.callbackUrl}
    />
  );
}
