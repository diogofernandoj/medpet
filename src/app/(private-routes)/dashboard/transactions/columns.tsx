"use client";

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
import { Client, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import localePtBr from "date-fns/locale/pt-BR";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MoreHorizontal,
  PenSquareIcon,
  Settings2Icon,
} from "lucide-react";
import TransactionForm from "../components/transaction-form";
import DeleteTransaction from "../components/delete-transaction";

export const columns: ColumnDef<Transaction & { client: Client }>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-sm">Título</div>,
    cell: ({ row }) => {
      const icon =
        row.original.type === "EARNING" ? (
          <ArrowUpIcon size={14} className="text-green-400" />
        ) : (
          <ArrowDownIcon size={14} className="text-red-400" />
        );
      const title = (
        <span className="flex items-center gap-1">
          {icon} {row.original.title}
        </span>
      );
      return (
        <div className="font-medium text-[10px] lg:text-base text-gray-500">
          {title}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center text-sm">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status ? (
        <span className="text-green-400 bg-green-500 bg-opacity-10 px-1 lg:px-2 rounded-md">
          Pago
        </span>
      ) : (
        <span className="text-yellow-400 bg-yellow-500 bg-opacity-10 px-1 lg:px-2 rounded-md">
          Pendente
        </span>
      );

      return (
        <div className="font-medium text-center text-[10px] lg:text-sm">
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-sm">Data</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const formatted = format(date, "dd/MM/yyyy");

      return (
        <div className="font-medium text-[10px] lg:text-base text-gray-500">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-sm">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      const number =
        row.original.type === "EARNING" ? (
          <span className="text-green-500">+{formatted}</span>
        ) : (
          <span className="text-red-500">-{formatted}</span>
        );

      return (
        <div className="font-medium text-[10px] lg:text-base">{number}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild className="hover:bg-gray-100 w-full">
                <button className="flex items-center gap-1 font-medium text-xs p-1">
                  <Settings2Icon size={14} /> Editar
                </button>
              </DialogTrigger>
              <DialogContent>
                <TransactionForm
                  transactionId={row.original.id}
                  data={{
                    title: row.original.title,
                    amount: Number(row.original.amount),
                    date: row.original.date,
                    notes: row.original.notes,
                    payment: row.original.payment,
                    status: row.original.status,
                    type: row.original.type,
                    client_id: row.original.client_id || undefined,
                  }}
                />
              </DialogContent>
            </Dialog>
            <DeleteTransaction transactionId={row.original.id} />
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
                      row.original.date,
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
