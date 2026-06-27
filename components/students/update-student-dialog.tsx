import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudentForm } from "./student-form";
import { Student } from "@/types/student";

interface UpdateStudentDialogProps {
  student: Student;
}

export function UpdateStudentDialog({ student }: UpdateStudentDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-lg font-semibold mb-4">Edit Student</h3>
        <StudentForm student={{ ...student, email: student.email || "", phone: student.phone || "" }} />
      </DialogContent>
    </Dialog>
  );
}