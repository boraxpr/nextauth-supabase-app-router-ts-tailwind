import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RESTRICTED_PATHS = ["/account", "/quotations", "/projects"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If User is not signed in and the current path is restricted, redirect to /auth/signin?callbackUrl=...
  if (
    !user &&
    RESTRICTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${req.nextUrl.pathname}`, req.url)
    );
  } else if (user && req.nextUrl.pathname === "/auth/signin") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
}
