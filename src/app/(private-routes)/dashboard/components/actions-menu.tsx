import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, MoreHorizontal, PenSquareIcon } from "lucide-react";
import Link from "next/link";
import DeleteTransaction from "./delete-transaction";
import localePtBr from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useState } from "react";

const ActionsMenu = ({ row }: { row: any }) => {
  const [menu, setMenu] = useState(false);

  return (
    <DropdownMenu open={menu} onOpenChange={setMenu}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/dashboard//transactions/${row.original.id}`}>
          <button className="flex items-center gap-1 font-medium text-xs p-1 w-full hover:bg-gray-100">
            <EyeIcon size={14} /> Ver completo
          </button>
        </Link>
        <Dialog>
          <DialogTrigger asChild className="hover:bg-gray-100 w-full">
            <button className="flex items-center gap-1 font-medium text-xs p-1">
              <PenSquareIcon size={14} /> Anotações
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">{`${row.original.title}, ${format(
                  row.original.created_at,
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: localePtBr,
                  }
                )}`}</span>
                {row.original.client && (
                  <span className="text-xs font-medium">
                    {"- "} {row.original.client.name}
                  </span>
                )}
              </div>
            </DialogHeader>
            <span className="font-semibold text-xs text-primary">
              Anotações:
            </span>
            <textarea
              value={row.original.notes}
              disabled
              className="p-2 text-gray-400 hover:cursor-not-allowed"
            />
          </DialogContent>
        </Dialog>
        <DeleteTransaction transactionId={row.original.id} setMenu={setMenu} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
