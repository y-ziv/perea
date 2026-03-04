import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function isAdmin(email?: string | null): boolean {
  return !!email && allowedEmails.includes(email.toLowerCase());
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // API routes: 401 if not authenticated, 403 if not admin
  if (pathname.startsWith("/api/admin")) {
    if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isAdmin(req.auth.user?.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Admin pages: redirect to login if not authenticated or not admin
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!req.auth || !isAdmin(req.auth.user?.email)) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)", "/api/admin/:path*"],
};
