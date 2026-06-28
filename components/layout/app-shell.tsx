"use client";

import { useState } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        <AppSidebar mobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex flex-1 flex-col">
          <AppHeader onToggleSidebar={() => setIsSidebarOpen(true)} />

          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>

      <Toaster richColors position="top-right" />
    </>
  );
}