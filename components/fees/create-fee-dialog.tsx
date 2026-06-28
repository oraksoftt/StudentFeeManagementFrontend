"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import { FeeForm } from "./fee-form";

export function CreateFeeDialog() {
  const t = useTranslations("fees");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("add")}</Button>
      </DialogTrigger>

      <DialogContent>
        <FeeForm />
      </DialogContent>
    </Dialog>
  );
}