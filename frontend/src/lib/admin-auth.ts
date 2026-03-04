import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

type RouteHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withAdminAuth(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Defense-in-depth: verify email is in the admin allowlist
    if (
      allowedEmails.length > 0 &&
      !allowedEmails.includes(session.user.email.toLowerCase())
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return handler(request, context);
  };
}
