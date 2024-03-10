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
  EyeIcon,
  MoreHorizontal,
  PenSquareIcon,
} from "lucide-react";
import DeleteTransaction from "../components/delete-transaction";
import ToggleStatusButton from "../components/toggle-status-button";
import Link from "next/link";

export const columns: ColumnDef<Transaction & { client?: Client }>[] = [
  {
    accessorKey: "created_at",
    header: () => <div className="text-sm">Data</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formatted = format(date, "dd/MM/yyyy");

      return (
        <div className="font-medium text-[10px] lg:text-base text-gray-500">
          {formatted}
        </div>
      );
    },
  },
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
        <div className="font-medium text-[10px] lg:text-sm text-gray-500">
          {title}
        </div>
      );
    },
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: ({ row }) => {
      const clientName = row.original?.client?.name || "";
      const capitalizedName = () => {
        const names = clientName.toLocaleLowerCase().split(" ");
        const name = names.map(
          (name) => name.charAt(0).toLocaleUpperCase() + name.slice(1)
        );

        return name.join(" ");
      };

      return (
        <div className="font-medium text-[10px] lg:text-sm text-gray-500 hover:text-gray-800">
          <Link href={`/clients/${row.original.client_id}`}>
            {capitalizedName()}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center text-sm">Status</div>,
    cell: ({ row }) => {
      const transactionId = row.original.id;
      const status = row.original.status ? (
        <span className="text-green-400 bg-green-500 bg-opacity-10 px-1 lg:px-2 rounded-md">
          <button>Pago</button>
        </span>
      ) : (
        <span className="text-yellow-400 bg-yellow-500 bg-opacity-10 px-1 lg:px-2 rounded-md">
          <ToggleStatusButton transactionId={transactionId}>
            Pendente
          </ToggleStatusButton>
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
    accessorKey: "payment_date",
    header: () => <div className="text-sm">Pagamento</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.payment_date);
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
            <DeleteTransaction transactionId={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
