/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";

export async function getStudents() {  
  const res = await api.get("/students");
  return res.data;
}

export async function getStudentById(id: string) {
  const res = await api.get(`/students/${id}`);
  return res.data;
}

export async function createStudent(data: any) {
  const res = await api.post("/students", data);
  return res.data;
}

export async function deleteStudent(id: string) {
  const res = await api.delete(`/students/${id}`);
  return res.data;
}
export async function updateStudent(id: string, data: any) {
  const res = await api.put(`/students/${id}`, data);
  return res.data;
}