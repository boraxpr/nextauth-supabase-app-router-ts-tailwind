"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Session } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ServerActionResult } from "@/types/server";

interface Props {
  session: Session | null;
  signOutFn: () => Promise<ServerActionResult>;
}

export default function AuthSection(props: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: props.signOutFn,
    onSuccess: () => {
      setTimeout(() => {
        router.refresh();
      }, 1000);
    },
  });
  if (!props.session)
    return (
      <div className="space-x-3">
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
          href="/auth/signup"
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
      <div className="space-x-3">
        <Link
          href="/account"
          className={
            (buttonVariants({
              variant: "link",
            }),
            "text-white decoration-white text-sm font-medium")
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
