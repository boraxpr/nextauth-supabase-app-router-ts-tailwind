import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { getSession, signOut } from "@/server/actions/auth";
import AuthSection from "./AuthSection";
import TopMenu from "./TopMenu";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="h-14 min-h-[3.5rem] bg-primary/95 sticky top-0 left-0 right-0 bottom-0 px-3 flex justify-between items-center shadow-md space-x-3 z-50">
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "text-white text-base p-2"
        )}
      >
        Sphere Accounts
      </Link>
      {session && <TopMenu />}
      <div className="flex-1" />
      <AuthSection session={session} signOutFn={signOut} />
    </nav>
  );
}
