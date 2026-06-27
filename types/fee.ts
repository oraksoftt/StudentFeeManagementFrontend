export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  remarks?: string;
}

export interface CreateFeeRequest {
  studentId: string;
  amount: number;
  paymentDate: string;
  remarks?: string;
}