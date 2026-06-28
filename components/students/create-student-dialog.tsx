"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import { StudentForm } from "./student-form";

export function CreateStudentDialog() {
  const t = useTranslations("students");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("add")}</Button>
      </DialogTrigger>

      <DialogContent>
        <StudentForm />
      </DialogContent>
    </Dialog>
  );
}