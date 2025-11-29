"use client";

import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search customers, campaigns, properties..."
          className="pl-10"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {session?.user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
            {session?.user?.name
              ? getInitials(session.user.name)
              : session?.user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
