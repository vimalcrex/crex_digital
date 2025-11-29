import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { CustomerSidebar } from "@/components/customer/sidebar";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Redirect if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Redirect admins to admin dashboard
  if (session.user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  // Check if account is active
  if (session.user.role === "CUSTOMER") {
    // Could add additional checks here for subscription status
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <CustomerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
