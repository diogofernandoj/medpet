"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "../../dashboard/clients/columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ArrowUpDownIcon,
  EyeIcon,
  Trash2Icon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteClient from "../components/delete-client";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "document",
    header: "CPF",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[10px] lg:text-sm text-gray-800">
          {row.original.document}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[10px] lg:text-sm text-gray-800">
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[10px] lg:text-sm text-gray-800">
          {row.original.phone}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[10px] lg:text-sm text-gray-800">
          {row.original.address}
        </div>
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
                  <EyeIcon size={14} /> Ver completo
                </button>
              </DialogTrigger>
              <DialogContent>oi</DialogContent>
            </Dialog>
            <DeleteClient clientId={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];