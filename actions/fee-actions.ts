"use server";

import { revalidatePath } from "next/cache";
import {updateFee as updateFeeService, deleteFee as deleteFeeService, createFee as createFeeService } from "@/services/fee.service";
export async function createFee(formData: FormData) {
const payload = {
    studentId:formData.get("studentId") || "", 
    amount: formData.get("amount") ? Number(formData.get("amount")) : 0, 
    paymentDate: formData.get("paymentDate") || new Date().toISOString().split("T")[0],
    remarks: formData.get("remarks") || null, 
  };
 await createFeeService(payload);

  revalidatePath("/en/Fees");
}

export async function deleteFee( id: string ) {
   console.log("Deleting Fee with ID:", id);
  
  await deleteFeeService(id);
  revalidatePath("/en/Fees");
}
export async function updateFee(id: string, formData: FormData) {
const payload = {
    studentId:formData.get("studentId") || "", 
    amount: formData.get("amount") ? Number(formData.get("amount")) : 0, 
    paymentDate: formData.get("paymentDate") || new Date().toISOString().split("T")[0],
    remarks: formData.get("remarks") || null, 
  };
  await updateFeeService(id, payload);

  revalidatePath("/en/Fees");
}