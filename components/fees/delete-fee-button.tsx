"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { deleteFee } from "@/actions/fee-actions";

export function DeleteFeeButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations();

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteFee(id);
      toast.success(t("feedback.feeDeleted"));
    } catch {
      toast.error(t("feedback.feeDeleteFailed"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={t("actions.deleteFee")}
      className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-white bg-red-800 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-.894.553L4 4H2a1 1 0 100 2h1v10a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2l-1.106-1.447A1 1 0 0014 2H6zm3 6a1 1 0 10-2 0v6a1 1 0 102 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
      </svg>
    </button>
  );
}