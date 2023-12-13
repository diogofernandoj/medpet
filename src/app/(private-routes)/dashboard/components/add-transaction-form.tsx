"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  Loader2Icon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";
import CurrencyInput from "./currency-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().trim().min(2, { message: "O título é obrigatório" }),
  type: z.enum(["EARNING", "EXPENSE"]),
  date: z.date({ required_error: "A data é obrigatória" }),
  amount: z.string({ required_error: "O valor não pode ser nulo" }).trim(),
  installments: z.coerce
    .number()
    .min(1, { message: "O número de parcelas deve ser maior que 0" }),
  status: z.enum(["PAID", "PENDING"]),
  description: z.string().trim().optional(),
});

const AddTransactionForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "EARNING",
      date: new Date(),
      amount: "0",
      installments: 1,
      status: "PAID",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/5">Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira um título"
                  {...field}
                  className="rounded-lg border w-full border-gray-300 bg-white text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/5">Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Selecione o tipo da transação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EARNING">
                    <span className="flex items-center gap-1">
                      Entrada <ArrowUpIcon size={14} color="#0f0" />
                    </span>
                  </SelectItem>
                  <SelectItem value="EXPENSE">
                    <span className="flex items-center gap-1">
                      Saída <ArrowDownIcon size={14} color="#f00" />
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/5">Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left bg-white",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd / MM / yyyy", {})
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("2023-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/5">Valor</FormLabel>
              <FormControl>
                <CurrencyInput
                  decimalsLimit={2}
                  placeholder="R$0,00"
                  onValueChange={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="installments"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/5">Parcelas</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número de parcelas"
                  {...field}
                  type="number"
                  min={1}
                  className="rounded-lg border w-full border-gray-300 bg-white p-2 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/5">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Selecione o status da transação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PAID">
                    <span className="flex items-center gap-1">Pago</span>
                  </SelectItem>
                  <SelectItem value="PENDING">
                    <span className="flex items-center gap-1">Pendente</span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/6">Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira um descrição (opcional)"
                  {...field}
                  className="rounded-lg border w-full border-gray-300 bg-white text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddTransactionForm;
