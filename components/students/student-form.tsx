/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toast } from "sonner";

import { createStudent, updateStudent } from "@/services/student.service";

const schema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("validation.nameMin")),
    email: z.string(),
    phone: z.string(),
  });

type FormData = {
  name: string;
  email: string;
  phone: string;
};

interface StudentFormProps {
  student?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export function StudentForm({ student }: StudentFormProps) {
  const isEdit = !!student;
  const router = useRouter();
  const t = useTranslations();

  const form = useForm<FormData>({
    resolver: zodResolver(schema(t)),
    defaultValues: student
      ? {
          name: student.name,
          email: student.email,
          phone: student.phone,
        }
      : {
          name: "",
          email: "",
          phone: "",
        },
  });

  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        email: student.email,
        phone: student.phone,
      });
    }
  }, [student, form]);

  async function onSubmit(values: FormData) {
    try {
      if (isEdit && student) {
        await updateStudent(student.id, values);
        toast.success(t("feedback.studentUpdated"));
      } else {
        await createStudent(values);
        toast.success(t("feedback.studentCreated"));
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
        <label className="mb-1 text-sm font-medium">{t("labels.fullName")}</label>
        <input
          {...form.register("name")}
          placeholder={t("placeholders.name")}
          className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{t("labels.email")}</label>
        <input
          {...form.register("email")}
          placeholder={t("placeholders.email")}
          className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{t("labels.phone")}</label>
        <input
          {...form.register("phone")}
          placeholder={t("placeholders.phone")}
          className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? t("buttons.saving") : isEdit ? t("students.update") : t("students.create")}
      </button>
    </form>
  );
}
