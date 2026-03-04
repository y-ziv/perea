import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      <AdminSidebar />
      <div className="mr-56 min-h-screen p-8">{children}</div>
    </div>
  );
}
