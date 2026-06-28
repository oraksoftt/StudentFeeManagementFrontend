"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AppSidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const t = useTranslations();

  const content = (
    <div className="w-64 border-r bg-slate-50 min-h-screen shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 bg-white text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
        {t("menu.title")}
      </div>

      <nav className="space-y-2 p-4">
        <Link
          href="/students"
          className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
        >
          {t("menu.students")}
        </Link>

        <Link
          href="/fees"
          className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
        >
          {t("menu.fees")}
        </Link>
      </nav>
    </div>
  );

  // desktop sidebar
  return (
    <>
      <div className="hidden md:block">{content}</div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative w-72 bg-slate-50 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="text-sm font-semibold">{t("menu.title")}</div>
              <button aria-label="Close menu" onClick={onClose} className="p-1">
                ✕
              </button>
            </div>
            <div className="p-4">{content}</div>
          </div>
        </div>
      )}
    </>
  );
}
