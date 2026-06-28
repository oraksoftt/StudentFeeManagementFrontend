"use client";

import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeeForm } from "./fee-form";
import { Fee } from "@/types/fee";

interface UpdateFeeDialogProps {
  fee: Fee;
}

export function UpdateFeeDialog({ fee }: UpdateFeeDialogProps) {
  const t = useTranslations("fees");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {t("edit")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <h3 className="mb-4 text-lg font-semibold">{t("edit")}</h3>
        <FeeForm fee={fee} />
      </DialogContent>
    </Dialog>
  );
}