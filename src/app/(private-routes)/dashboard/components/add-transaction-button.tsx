"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import TransactionForm from "./transaction-form";
import { useState } from "react";

const AddTransactionButton = ({ client_id }: { client_id?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-primary text-xs lg:text-sm flex items-center gap-1"
          variant="ghost"
        >
          <PlusIcon size={18} /> Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[640px]">
        <TransactionForm client_id={client_id || undefined} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
