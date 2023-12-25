import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import TransactionForm from "./transaction-form";

const AddTransactionButton = () => {
  const [transactionAdded, setTransactionAdded] = useState(false);

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setTransactionAdded(e);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="text-primary text-xs lg:text-sm flex items-center gap-1"
          variant="ghost"
        >
          <PlusIcon size={18} /> Adicionar
        </Button>
      </DialogTrigger>
      {transactionAdded ? (
        <DialogContent>
          <DialogHeader>
            <span className="text-primary flex items-center gap-3 text-lg font-semibold">
              <CheckCircle2Icon size={30} />
              Transação adicionada com sucesso!
            </span>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova transação</DialogTitle>
            <DialogDescription>
              Preencha os dados para adicionar uma transação.
            </DialogDescription>
          </DialogHeader>
          <TransactionForm setTransactionAdded={setTransactionAdded} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddTransactionButton;
