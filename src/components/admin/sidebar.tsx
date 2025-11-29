"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  Settings,
  LogOut,
  Building2,
  BarChart3,
  Lightbulb,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { name: "Landing Pages", href: "/admin/templates", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "AI Insights", href: "/admin/insights", icon: Lightbulb },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            CREX<span className="text-blue-600">Digital</span>
          </span>
        </Link>
        <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
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
