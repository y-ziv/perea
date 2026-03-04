import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // API routes should return 401 JSON, not redirect to login page
  if (pathname.startsWith("/api/admin") && !req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Admin pages redirect unauthenticated users to login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)", "/api/admin/:path*"],
};
