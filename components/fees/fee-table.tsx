"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Fee } from "@/types/fee";
import { DeleteFeeButton } from "@/components/fees/delete-fee-button";
import { UpdateFeeDialog } from "./update-fee-dialog";

interface Props {
  fees: Fee[];
}

export function FeeTable({ fees }: Props) {
  const t = useTranslations("table");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const total = fees.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return fees.slice(start, start + perPage);
  }, [fees, page, perPage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("student")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("amount")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("paymentDate")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("remarks")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("actions")}</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {fees.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  {t("noneRecord")}
                </td>
              </tr>
            ) : (
              pageData.map((fee) => (
                <tr key={fee.id} className="group hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fee.studentName}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {formatCurrency(fee.amount)}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(fee.paymentDate)}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate" title={fee.remarks}>
                    {fee.remarks || <span className="text-gray-300 italic">{t("status.none")}</span>}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <UpdateFeeDialog fee={fee} />
                      <DeleteFeeButton id={fee.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rows:</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded border p-1 text-sm"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded border px-2 py-1 text-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="text-sm">
            Page {page} / {totalPages}
          </div>
          <button
            className="rounded border px-2 py-1 text-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}