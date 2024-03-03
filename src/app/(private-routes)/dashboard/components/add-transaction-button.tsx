import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import TransactionForm from "./transaction-form";

const AddTransactionButton = ({ client_id }: { client_id?: string }) => {
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
      <DialogContent className="w-full max-w-[640px]">
        <TransactionForm client_id={client_id || undefined} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
