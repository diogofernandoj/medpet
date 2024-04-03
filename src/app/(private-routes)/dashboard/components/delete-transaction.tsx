import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangleIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { deleteTransaction } from "../_actions/delete-transaction";
import { useContext, useState } from "react";
import { DateRangeContext } from "@/app/providers/date-range";
import { useToast } from "@/components/ui/use-toast";

interface DeleteTransactionProps {
  transactionId: string;
  setMenu: (boolean: boolean) => void;
}

const DeleteTransaction = ({
  transactionId,
  setMenu,
}: DeleteTransactionProps) => {
  const { setRevalidateTransactions } = useContext(DateRangeContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const { toast } = useToast();

  const handleDeleteClick = async () => {
    setLoading(true);

    const res = await deleteTransaction({ transactionId });

    if (res.message) {
      toast({
        description: "Falha ao registrar transação",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setRevalidateTransactions((prev: number) => prev + 1);
    setModal(false);
    setMenu(false);
    toast({
      title: "Transação removida com sucesso!",
      className: "bg-primary text-white font-bold",
    });
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild className="hover:bg-gray-100 w-full">
        <button className="flex items-center gap-1 font-medium text-xs p-1">
          <Trash2Icon size={14} /> Excluir
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span className="flex mr-4 items-center gap-2 bg-red-200 text-red-500 border-l-4 font-medium p-2 text-sm border-red-500">
            <AlertTriangleIcon size={20} /> Deletar transação
          </span>
        </DialogHeader>
        <p className="text-xs text-gray-400">
          Você tem certeza que deseja deletar essa transação? Essa ação não pode
          ser desfeita.
        </p>
        <div className="flex items-center gap-2 justify-end">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={loading}
            className={`font-bold w-28 ${loading && "bg-opacity-75"}`}
            onClick={handleDeleteClick}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Confirmar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransaction;
