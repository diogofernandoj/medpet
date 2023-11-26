"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
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
    cell: () => {
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
            <DropdownMenuItem className="flex items-center gap-1 font-medium">
              <PencilIcon size={14} /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 font-medium">
              <Trash2Icon size={14} /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
