"use client";

import { Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerHeaderProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function CustomerHeader({
  title,
  description,
  action,
}: CustomerHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Page title */}
      <div>
        {title && <h1 className="text-lg font-semibold text-gray-900">{title}</h1>}
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {action}

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </div>
    </header>
  );
}
