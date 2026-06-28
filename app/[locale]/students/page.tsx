/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStudents } from "@/services/student.service";
import { StudentTable } from "@/components/students/student-table";
import { CreateStudentDialog } from "@/components/students/create-student-dialog";
import { getTranslations } from "next-intl/server";

export default async function StudentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "students" });
  const data = await getStudents();

  const students = data?.data || [];

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <CreateStudentDialog />
      <StudentTable students={students} />
    </>
  );
}