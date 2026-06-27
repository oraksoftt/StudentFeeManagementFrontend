"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeeForm } from "./fee-form"; 
import { Fee } from "@/types/fee";

interface UpdateFeeDialogProps {
  fee: Fee;
}

export function UpdateFeeDialog({ fee }: UpdateFeeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <h3 className="text-lg font-semibold mb-4">Edit Fee Record</h3>
        
         
        <FeeForm fee={fee} />
      </DialogContent>
    </Dialog>
  );
}