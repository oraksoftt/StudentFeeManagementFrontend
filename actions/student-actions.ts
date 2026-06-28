"use server";

import { revalidatePath } from "next/cache";
import { updateStudent as updateStudentService, deleteStudent as deleteStudentService, createStudent as createStudentService } from "@/services/student.service";

const locales = ["en", "ur", "ar"];

function revalidateStudentRoutes() {
  locales.forEach((locale) => {
    revalidatePath(`/${locale}/students`);
  });
  revalidatePath("/students");
}

export async function createStudent(formData: FormData) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };
  await createStudentService(payload);

  revalidateStudentRoutes();
}

export async function deleteStudent(id: string) {
  await deleteStudentService(id);
  revalidateStudentRoutes();
}

export async function updateStudent(id: string, formData: FormData) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };
  await updateStudentService(id, payload);

  revalidateStudentRoutes();
}