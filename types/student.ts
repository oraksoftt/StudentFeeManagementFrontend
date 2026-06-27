
export interface Student {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: string;
}

export interface CreateStudentRequest {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateStudentRequest {
  name: string;
  email?: string;
  phone?: string;
}