import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddTransaction from "./add-transaction";

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
      <DialogContent className="h-[640px]">
        <AddTransaction />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
