"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { ColumnDef } from "@tanstack/react-table";

export type Client = {
  id: string;
  name: string;
  document: string;
  address: string;
  phone: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "selected",
    header: "",
    cell: ({ row }) => {
      return (
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <RadioGroupItem value={row.original.id} id={row.original.id} />
          </FormControl>
          <FormLabel></FormLabel>
        </FormItem>
      );
    },
  },
  {
    accessorKey: "document",
    header: "CPF",
    cell: ({ row }) => {
      return (
        <div className="text-[10px] lg:text-xs font-medium">
          {row.original.document}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      return (
        <div className="text-[10px] lg:text-xs font-medium">
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
        <div className="text-[10px] lg:text-xs font-medium">
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
        <div className="text-[10px] lg:text-xs font-medium">
          {row.original.address}
        </div>
      );
    },
  },
];
