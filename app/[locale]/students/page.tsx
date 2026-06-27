/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStudents } from "@/services/student.service";
import { StudentTable } from "@/components/students/student-table";
import { CreateStudentDialog } from "@/components/students/create-student-dialog";
export default async function StudentsPage() {
  const data = await getStudents();

  const students = data?.data || [];

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Students
        </h1>
      </div>

      <CreateStudentDialog />
      <StudentTable students={students} />
    </>
  );
}