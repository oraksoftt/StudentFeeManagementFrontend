"use client";

import { useTranslations } from "next-intl";

interface SectionHeadingProps {
  label: string;
}

export function SectionHeading({ label }: SectionHeadingProps) {
  const t = useTranslations();

  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-2xl font-bold">{t(label)}</h1>
    </div>
  );
}
