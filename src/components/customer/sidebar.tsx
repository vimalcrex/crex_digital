"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Building2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Landing Pages", href: "/landing-pages", icon: FileText },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function CustomerSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            CREX<span className="text-blue-600">Digital</span>
          </span>
        </Link>
      </div>

      {/* Organization name */}
      {session?.user?.organizationId && (
        <div className="border-b border-gray-200 px-6 py-3">
          <p className="text-xs font-medium uppercase text-gray-400">
            Organization
          </p>
          <p className="truncate text-sm font-medium text-gray-900">
            {/* Organization name would come from session or separate fetch */}
            My Properties
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className="mb-3 px-3">
          <p className="truncate text-sm font-medium text-gray-900">
            {session?.user?.name}
          </p>
          <p className="truncate text-xs text-gray-500">
            {session?.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
