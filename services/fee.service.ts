/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";

export async function getFees() {
  const res = await api.get("/fees");
  return res.data;
}

export async function createFee(data: any) {
  const res = await api.post("/fees", data);
  return res.data;
}

export async function deleteFee(id: string) {
  const res = await api.delete(`/fees/${id}`);
  return res.data;
}
export async function updateFee(id: string, data: any) {
  const res = await api.put(`/fees/${id}`, data);
  return res.data;
}