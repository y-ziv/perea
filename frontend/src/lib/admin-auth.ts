import "server-only";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllowedEmails } from "@/lib/allowed-emails";

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

    // Fail-closed: if allowlist is empty or email is not in the list, deny access
    const allowedEmails = getAllowedEmails();
    if (
      allowedEmails.length === 0 ||
      !allowedEmails.includes(session.user.email.toLowerCase())
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return handler(request, context);
  };
}
