/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { createFee, updateFee } from "@/services/fee.service";
import { Fee } from "@/types/fee"; // Adjust path as needed

// Client-side schema matching the CreateFeeRequest structure
const schema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentDate: z.string().min(1, "Payment date is required"),
  remarks: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface FeeFormProps {
  fee?: Fee; // Using your real Fee interface for editing mode
}

export function FeeForm({ fee }: FeeFormProps) {
  const isEdit = !!fee;
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
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

  // Track fee updates if passed down asynchronously 
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
        toast.success("Fee updated successfully.");
      } else {
        await createFee(values);
        toast.success("Fee created successfully.");
        form.reset();
      }
      router.refresh();
    } catch (apiError: any) {
      const backendErrors = apiError?.error;

      if (backendErrors) {
        Object.keys(backendErrors).forEach((serverKey) => {
          // Normalizes case or falls back to key mapping matching your backend payload
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col max-w-sm">
      
      {errors.root && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded font-medium text-sm">
          {errors.root.message}
        </div>
      )}

      {/* Student ID */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Student ID</label>
        <input
          {...form.register("studentId")}
          placeholder="e.g. STU12345"
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500"
        />
        {errors.studentId && (
          <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
        )}
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          {...form.register("amount")}
          placeholder="0.00"
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Payment Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Payment Date</label>
        <input
          type="date"
          {...form.register("paymentDate")}
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500"
        />
        {errors.paymentDate && (
          <p className="text-red-500 text-sm mt-1">{errors.paymentDate.message}</p>
        )}
      </div>

      {/* Remarks */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Remarks (Optional)</label>
        <textarea
          {...form.register("remarks")}
          placeholder="Add additional notes here..."
          className="border p-2 rounded w-full border-gray-300 focus:outline-blue-500 resize-none h-20"
        />
        {errors.remarks && (
          <p className="text-red-500 text-sm mt-1">{errors.remarks.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : isEdit ? "Update Fee" : "Create Fee"}
      </button>
    </form>
  );
}