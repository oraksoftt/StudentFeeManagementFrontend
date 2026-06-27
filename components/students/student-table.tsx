import { Student } from "@/types/student";
import { DeleteStudentButton } from "@/components/students/student-delete-button";
import { UpdateStudentDialog } from "./update-student-dialog";

interface Props {
  students: Student[];
}

export function StudentTable({
  students,
}: Props) {
  return (    
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Id</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {students.map(student => (
            <tr key={student.id} className="group hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <div className="flex items-center space-x-2 ">
                                 
                  <UpdateStudentDialog student={student} />

                  <DeleteStudentButton id={student.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}