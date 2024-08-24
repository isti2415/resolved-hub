import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { initPocketBaseServer } from "./lib/pocketbase/server";

export async function middleware(request: NextRequest) {
  const pb = await initPocketBaseServer();

  if (!pb.authStore.model && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pb.authStore.model && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
