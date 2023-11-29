import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { getSession, signOut } from "@/server/actions/auth";
import AuthSection from "./nav/AuthSection";
import SideMenu from "./SideMenu";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="h-14 bg-primary sticky top-0 left-0 right-0 bottom-0 px-3 flex justify-between items-center shadow-md">
      <SideMenu />
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
      <div className="flex-1" />
      <AuthSection session={session} signOutFn={signOut} />
    </nav>
  );
}
