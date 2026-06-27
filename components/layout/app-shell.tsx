import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AppSidebar />

      <div className="flex-1">
        <AppHeader />

        <main className="p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}