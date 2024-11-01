import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("spbe-auth-cookies");

  if (!cookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/masterData/:path*", "/", "/settings/:path*"],
};
