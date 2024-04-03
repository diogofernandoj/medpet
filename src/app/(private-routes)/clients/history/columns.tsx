"use client";

import { Client, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Link from "next/link";
import ToggleStatusButton from "../../dashboard/components/toggle-status-button";
import ActionsMenu from "../../dashboard/components/actions-menu";

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
      const paymentMonth = new Date(row.original.payment_date).getMonth();
      const currentMonth = new Date().getMonth();

      const transactionId = row.original.id;
      const status =
        paymentMonth < currentMonth && !row.original.status ? (
          <span className="text-red-400 bg-red-500 bg-opacity-10 px-1 lg:px-2 rounded-md">
            <ToggleStatusButton transactionId={transactionId}>
              Atrasado
            </ToggleStatusButton>
          </span>
        ) : row.original.status ? (
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
      const date = new Date(
        new Date(row.original.payment_date).setHours(
          new Date(row.original.payment_date).getHours() + 3
        )
      );
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
      return <ActionsMenu row={row} />;
    },
  },
];
