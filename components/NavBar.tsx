import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import SideMenu from "@/components/SideMenu";
import Link from "next/link";
import { SBServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { getSession, signOut } from "@/server/actions/auth";
import AuthSection from "./nav/AuthSection";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="h-14 bg-primary sticky top-2 left-0 right-0 bottom-0 rounded-full m-2 px-5 flex justify-between items-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "text-white text-base"
        )}
      >
        Sphere Accounts
      </Link>

      <AuthSection session={session} signOutFn={signOut} />

      {/* <div className="m-2 w-2/4">{session && <SideMenu />}</div> */}
      {/* <div className="m-2 text-sm flex flex-row justify-center items-center overflow-hidden">
        {session && (
          <span>
            Hello,
            <a href="/account" className="font-extrabold ">
              {" "}
              {username}
            </a>{" "}
            !
          </span>
        )}
      </div>
      <div className="flex flex-row justify-end m-2">
        {session ? (
          <form action={signOut}>
            <button className="rounded-md no-underline border bg-primary text-primary-foreground p-2">
              Signout
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            className="p-2 rounded-md no-underline bg-primary border text-primary-foreground "
          >
            Login
          </Link>
        )}
      </div> */}
    </nav>
  );
}
