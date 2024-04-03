import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangleIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { deleteClient } from "../_actions/delete-client";

const DeleteClient = ({ clientId }: { clientId: string }) => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
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

    setOpen(false);
    toast({
      title: "Cliente removido com sucesso!",
      className: "bg-primary text-white font-bold",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="hover:bg-gray-100 w-full">
        <button className="flex items-center gap-1 font-medium text-xs p-1">
          <Trash2Icon size={14} /> Excluir
        </button>
      </DialogTrigger>
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
    </Dialog>
  );
};

export default DeleteClient;
