import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddTransactionForm from "./add-transaction-form";

const AddTransactionButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-primary text-xs lg:text-sm flex items-center gap-1"
          variant="ghost"
        >
          <PlusIcon size={18} /> Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar uma transação.
          </DialogDescription>
        </DialogHeader>
        <AddTransactionForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
