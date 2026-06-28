"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useMemo } from "react";

const locales = [
  { code: "en", labelKey: "app.english" },
  { code: "ur", labelKey: "app.urdu" },
  { code: "ar", labelKey: "app.arabic" },
];

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname() || "/";

  const currentPath = useMemo(() => (pathname === "" ? "/" : pathname), [pathname]);

  const setLocaleCookie = (nextLocale: string) => {
    try {
      // Keep cookie in sync with client-side navigation so server-side
      // rendering honors the chosen locale. Use lax sameSite to match
      // next-intl expectations.
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; sameSite=lax`;
    } catch (e) {
      // ignore — best-effort
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    setLocaleCookie(nextLocale);

    const cp = currentPath === "/" ? "" : currentPath;
    window.location.href = `/${nextLocale}${cp}`;
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-600">{t("app.language")}</span>
      <select
        className="rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={locale}
        onChange={handleChange}
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {t(l.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
