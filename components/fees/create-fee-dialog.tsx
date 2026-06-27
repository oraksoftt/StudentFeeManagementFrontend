"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { FeeForm } from "./fee-form";

export function CreateFeeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Fee
        </Button>
      </DialogTrigger>

      <DialogContent>
        <FeeForm />
      </DialogContent>
    </Dialog>
  );
}