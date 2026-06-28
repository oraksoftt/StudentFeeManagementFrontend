import { getFees } from "@/services/fee.service";
import { CreateFeeDialog } from "@/components/fees/create-fee-dialog";
import { FeeTable } from "@/components/fees/fee-table";
import { getTranslations } from "next-intl/server";

export default async function FeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fees" });
  const data = await getFees();
  const fees = data?.data || [];

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <CreateFeeDialog />
      <FeeTable fees={fees} />
    </>
  );
}