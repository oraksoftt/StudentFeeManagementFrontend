"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import LanguageSwitcher from "./language-switcher";
import { usePathname } from "next/navigation";

const locales = [
  { code: "en", labelKey: "app.english" },
  { code: "ur", labelKey: "app.urdu" },
  { code: "ar", labelKey: "app.arabic" },
];

export function AppHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const t = useTranslations();
  const pathname = usePathname() || "/";
  const locale = useLocale();

  // `usePathname` from next-intl already returns the pathname without
  // the locale prefix, so this is the canonical current path.
  const currentPath = useMemo(() => (pathname === "" ? "/" : pathname), [pathname]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    // For default locale (en) we prefer the locale-less path
    if (nextLocale === "en") {
      window.location.href = currentPath;
    } else {
      const cp = currentPath === "/" ? "" : currentPath;
      window.location.href = `/${nextLocale}${cp}`;
    }
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b bg-gray-200 px-4 py-3">
      <div className="flex items-center gap-4">
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-2xl font-bold">{t("app.title")}</h1>
      </div>

      <LanguageSwitcher />
    </header>
  );
}
