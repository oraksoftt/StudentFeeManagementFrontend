/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toast } from "sonner";

import { createFee, updateFee } from "@/services/fee.service";
import { Fee } from "@/types/fee";

const schema = (t: (key: string) => string) =>
  z.object({
    studentId: z.string().min(1, t("validation.studentIdRequired")),
    amount: z.coerce.number().positive(t("validation.amountPositive")),
    paymentDate: z.string().min(1, t("validation.paymentDateRequired")),
    remarks: z.string().optional(),
  });

type FormData = {
  studentId: string;
  amount: number;
  paymentDate: string;
  remarks?: string;
};

interface FeeFormProps {
  fee?: Fee;
}

export function FeeForm({ fee }: FeeFormProps) {
  const isEdit = !!fee;
  const router = useRouter();
  const t = useTranslations();

  const form = useForm<FormData>({
    resolver: zodResolver(schema(t)) as Resolver<FormData>,
    defaultValues: fee
      ? {
          studentId: fee.studentId,
          amount: fee.amount,
          paymentDate: fee.paymentDate,
          remarks: fee.remarks || "",
        }
      : {
          studentId: "",
          amount: 0,
          paymentDate: "",
          remarks: "",
        },
  });

  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (fee) {
      form.reset({
        studentId: fee.studentId,
        amount: fee.amount,
        paymentDate: fee.paymentDate,
        remarks: fee.remarks || "",
      });
    }
  }, [fee, form]);

  async function onSubmit(values: FormData) {
    try {
      if (isEdit && fee) {
        await updateFee(fee.id, values);
        toast.success(t("feedback.feeUpdated"));
      } else {
        await createFee(values);
        toast.success(t("feedback.feeCreated"));
        form.reset();
      }
      router.refresh();
    } catch (apiError: any) {
      const backendErrors = apiError?.error;

      if (backendErrors) {
        Object.keys(backendErrors).forEach((serverKey) => {
          const formKey = serverKey.toLowerCase() as keyof FormData;
          const messages = backendErrors[serverKey];

          if (messages && messages.length > 0) {
            form.setError(formKey, { type: "server", message: messages[0] });
          }
        });
      } else {
        form.setError("root", {
          type: "server",
          message: apiError?.message || "An unexpected error occurred.",
        });
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-sm flex-col space-y-4">
      {errors.root && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
          {errors.root.message}
        </div>
      )}

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{t("labels.studentId")}</label>
        <input
          {...form.register("studentId")}
          placeholder={t("placeholders.studentId")}
          className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.studentId && <p className="mt-1 text-sm text-red-500">{errors.studentId.message}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{t("labels.amount")}</label>
        <input
          type="number"
          step="0.01"
          {...form.register("amount")}
          placeholder={t("placeholders.amount")}
          className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{t("labels.paymentDate")}</label>
        <input
          type="date"
          {...form.register("paymentDate")}
          className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.paymentDate && <p className="mt-1 text-sm text-red-500">{errors.paymentDate.message}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{t("labels.remarks")}</label>
        <textarea
          {...form.register("remarks")}
          placeholder={t("placeholders.remarks")}
          className="h-20 w-full resize-none rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.remarks && <p className="mt-1 text-sm text-red-500">{errors.remarks.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? t("buttons.saving") : isEdit ? t("fees.update") : t("fees.create")}
      </button>
    </form>
  );
}
