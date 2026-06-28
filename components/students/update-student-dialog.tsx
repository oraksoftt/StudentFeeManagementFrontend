"use client";

import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudentForm } from "./student-form";
import { Student } from "@/types/student";

interface UpdateStudentDialogProps {
  student: Student;
}

export function UpdateStudentDialog({ student }: UpdateStudentDialogProps) {
  const t = useTranslations("students");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {t("edit")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="mb-4 text-lg font-semibold">{t("edit")}</h3>
        <StudentForm student={{ ...student, email: student.email || "", phone: student.phone || "" }} />
      </DialogContent>
    </Dialog>
  );
}