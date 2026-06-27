"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { StudentForm } from "./student-form";

export function CreateStudentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent>
        <StudentForm />
      </DialogContent>
    </Dialog>
  );
}