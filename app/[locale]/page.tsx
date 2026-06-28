import { getTranslations } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
    </div>
  );
}
