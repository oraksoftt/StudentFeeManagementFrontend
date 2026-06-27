"use server";

import { revalidatePath } from "next/cache";
import { ZodGUID } from "zod";
import {updateStudent as updateStudentService, deleteStudent as deleteStudentService, createStudent as createStudentService } from "@/services/student.service";
export async function createStudent(formData: FormData) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };
 await createStudentService(payload);

  revalidatePath("/en/students");
}

export async function deleteStudent( id: string ) {
   console.log("Deleting student with ID:", id);
  
  await deleteStudentService(id);
  revalidatePath("/en/students");
}
export async function updateStudent(id: string, formData: FormData) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };
  await updateStudentService(id, payload);

  revalidatePath("/en/students");
}