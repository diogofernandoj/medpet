import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { DateRangeContext } from "@/app/providers/date-range";
import { Toaster } from "@/components/ui/toaster";
import { deleteClient } from "../_actions/delete-client";

const DeleteClient = ({ clientId }: { clientId: string }) => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDeleteClick = async () => {
    setLoading(true);

    const res = await deleteClient({ clientId });

    if (res.message) {
      toast({
        description: "Falha ao registrar transação",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setDeleted(true);
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger asChild className="hover:bg-gray-100 w-full">
        <button className="flex items-center gap-1 font-medium text-xs p-1">
          <Trash2Icon size={14} /> Excluir
        </button>
      </DialogTrigger>
      {deleted ? (
        <DialogContent className="text-primary flex items-center gap-3 text-lg font-semibold">
          <CheckCircle2Icon size={30} />
          Cliente deletado com sucesso!
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <span className="flex mr-4 items-center gap-2 bg-red-200 text-red-500 border-l-4 font-medium p-2 text-sm border-red-500">
              <AlertTriangleIcon size={20} /> Deletar cliente
            </span>
          </DialogHeader>
          <p className="text-xs text-gray-400">
            Você tem certeza que deseja excluir esse cliente? Essa ação não pode
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
      )}
    </Dialog>
  );
};

export default DeleteClient;
