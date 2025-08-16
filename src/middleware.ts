import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/expense")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/expense", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/expense/:path*", "/login", "/register"],
};
