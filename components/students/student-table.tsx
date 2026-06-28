"use client";

import { useTranslations } from "next-intl";
import { Student } from "@/types/student";
import { DeleteStudentButton } from "@/components/students/student-delete-button";
import { UpdateStudentDialog } from "./update-student-dialog";
import { useState, useMemo } from "react";

interface Props {
  students: Student[];
}

export function StudentTable({ students }: Props) {
  const t = useTranslations("table");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const total = students.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return students.slice(start, start + perPage);
  }, [students, page, perPage]);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("id")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("name")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("email")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("phone")}</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{t("actions")}</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pageData.map((student) => (
              <tr key={student.id} className="group hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <UpdateStudentDialog student={student} />
                    <DeleteStudentButton id={student.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rows:</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded border p-1 text-sm"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded border px-2 py-1 text-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="text-sm">
            Page {page} / {totalPages}
          </div>
          <button
            className="rounded border px-2 py-1 text-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}