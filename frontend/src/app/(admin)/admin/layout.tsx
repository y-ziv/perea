import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getAllowedEmails } from "@/lib/allowed-emails";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  const allowed = getAllowedEmails();
  if (!session || !email || (allowed.length > 0 && !allowed.includes(email))) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      <AdminSidebar />
      <div className="min-h-screen p-4 md:mr-56 md:p-8">{children}</div>
    </div>
  );
}
