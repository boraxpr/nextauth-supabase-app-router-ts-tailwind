"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Session } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/server/actions/auth";
import { Loader2 } from "lucide-react";
import Spinner from "../ui/spinner";

interface Props {
  session: Session | null;
  signOutFn: () => Promise<void>;
}

export default function AuthSection(props: Props) {
  const mutation = useMutation({
    mutationFn: props.signOutFn,
  });
  if (!props.session)
    return (
      <div className="space-x-2">
        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "sm",
            })
          )}
        >
          Sign In
        </Link>
        <Link
          href="/auth/signout"
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "sm",
            })
          )}
        >
          Sign Up
        </Link>
      </div>
    );
  else
    return (
      <div className="space-x-2">
        <Link
          href="/account"
          className={
            (buttonVariants({
              variant: "link",
            }),
            "text-white decoration-white")
          }
        >
          Hello, {props.session.user.email?.split("@")[0]}
        </Link>
        <Button
          variant="secondary"
          size="sm"
          loading={mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          Sign Out
        </Button>
      </div>
    );
}
