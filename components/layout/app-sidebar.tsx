import Link from "next/link";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-slate-50 min-h-screen shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 bg-white text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
        Menu
      </div>

      <nav className="space-y-2 p-4">
        <Link
          href="/en/students"
          className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
        >
          Students
        </Link>

        <Link
          href="/en/fees"
          className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
        >
          Fees
        </Link>
      </nav>
    </aside>
  );
}