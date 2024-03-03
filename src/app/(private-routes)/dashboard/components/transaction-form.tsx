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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircle2Icon,
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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import CurrencyInput from "./currency-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction } from "../_actions/create-transaction";
import { DateRangeContext } from "@/app/providers/date-range";
import { editTransaction } from "../_actions/edit-transaction";
import { paymentMethodTypes } from "@prisma/client";
import AddClient from "./add-client";
import { getClients } from "../_actions/get-clients";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().trim().min(2, { message: "O título é obrigatório" }),
  type: z.enum(["EARNING", "EXPENSE"]),
  payment_date: z.date({ required_error: "A data é obrigatória" }),
  amount: z.string({ required_error: "O valor não pode ser nulo" }).trim(),
  installments: z.coerce
    .number()
    .min(1, { message: "O número de parcelas deve ser maior que 0" }),
  status: z.string({ required_error: "O status não pode ficar em branco" }),
  payment: z.enum(["PIX", "BILL", "CREDIT", "DEBIT", "CASH"]),
  notes: z.string().trim(),
  client_name: z.string().optional(),
});

interface TransactionFormProps {
  data?: {
    title: string;
    type: string;
    payment_date: Date;
    amount: number;
    status: boolean;
    payment: paymentMethodTypes;
    notes: string;
  };
  transactionId?: string;
  client_id?: string;
}

const TransactionForm = ({
  data,
  transactionId,
  client_id,
}: TransactionFormProps) => {
  const { setRevalidateTransactions } = useContext(DateRangeContext);

  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [transactionAdded, setTransactionAdded] = useState(false);

  const [clientId, setClientId] = useState<string | undefined>(
    client_id || undefined
  );
  const [clientName, setClientName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getClient = async () => {
      const { clients } = await getClients({ search: clientId! });
      if (clients) {
        setClientName(clients[0].name);
      }
    };
    if (client_id || clientId) {
      getClient();
    }
  }, [clientId, client_id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      type: "EARNING",
      payment_date: data?.payment_date || new Date(),
      amount: JSON.stringify(data?.amount) || "0",
      installments: 1,
      status: !data?.status ? "0" : "1",
      payment: data?.payment || "CASH",
      notes: data?.notes || "",
      client_name: clientName,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const {
      title,
      payment_date,
      type,
      status,
      amount,
      installments,
      notes,
      payment,
    } = values;

    if (transactionId) {
      const res = await editTransaction({
        transactionId,
        amount: parseFloat(amount.replace(",", ".")),
        payment_date,
        notes,
        status: !!Number(status),
        title,
        type,
        payment,
      });

      if (res.message) {
        toast({
          description: "Falha ao atualizar transação",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setRevalidateTransactions((prev: number) => prev + 1);
      router.back();
      return;
    }

    const res = await createTransaction({
      title,
      payment_date,
      type,
      status: !!Number(status),
      amount: parseFloat(amount.replace(",", ".")),
      installments,
      notes,
      payment,
      client_id: clientId,
    });

    if (res.message) {
      toast({
        description: "Falha ao registrar transação",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setRevalidateTransactions((prev: number) => prev + 1);
    setTransactionAdded(true);
  };

  return (
    <div>
      {!transactionId && !transactionAdded && (
        <div className="mb-5">
          <div className="flex items-end px-4 justify-between">
            <div>
              <h2 className="text-lg font-semibold">Nova transação</h2>
              <p className="text-xs text-gray-400">
                Preencha os dados para adicionar uma nova transação.
              </p>
            </div>
            <AddClient setClientId={setClientId} />
          </div>
        </div>
      )}
      {transactionAdded ? (
        <div className="text-primary flex items-center gap-3 text-lg font-semibold">
          <CheckCircle2Icon size={30} />
          {!transactionId
            ? "Transação adicionada com sucesso!"
            : "Transação atualizada com sucesso!"}
        </div>
      ) : (
        <Form {...form}>
          <Toaster />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {clientName && (
              <div className="flex items-center gap-4">
                <label htmlFor="client" className="text-sm w-1/5 font-medium">
                  Cliente
                </label>
                <Input
                  type="text"
                  disabled
                  value={clientName}
                  className="rounded-lg border w-full flex-1 border-gray-300 bg-white text-sm"
                />
              </div>
            )}
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
                      className="rounded-lg border w-full flex-1 border-gray-300 bg-white text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={data?.type || field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full flex-1">
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
              name="payment_date"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-1/5">Pagamento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left bg-white flex-1",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd / MM / yyyy")
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
            <div className="flex items-center gap-1">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 w-full flex-1 space-y-0">
                    <FormLabel className="w-1/5">Valor</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        decimalsLimit={2}
                        placeholder="R$0,00"
                        onValueChange={field.onChange}
                        value={field.value}
                        onBlur={field.onBlur}
                        className={`flex-1 ${!transactionId && "ml-3"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!data && (
                <FormField
                  control={form.control}
                  name="installments"
                  render={({ field }) => (
                    <FormItem className="w-16">
                      <FormControl>
                        <Input
                          placeholder="Número de parcelas"
                          {...field}
                          type="number"
                          min={1}
                          className="rounded-lg border w-full px-2 h-10 border-gray-300 bg-white text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-1/5">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full flex-1">
                        <SelectValue placeholder="Selecione o status da transação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">
                        <span className="flex items-center gap-1">Pago</span>
                      </SelectItem>
                      <SelectItem value="0">
                        <span className="flex items-center gap-1">
                          Pendente
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
              name="payment"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-1/5">Forma de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full flex-1">
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CASH">
                        <span className="flex items-center gap-1">
                          Dinheiro
                        </span>
                      </SelectItem>
                      <SelectItem value="BILL">
                        <span className="flex items-center gap-1">Boleto</span>
                      </SelectItem>
                      <SelectItem value="CREDIT">
                        <span className="flex items-center gap-1">
                          Cartão de crédito
                        </span>
                      </SelectItem>
                      <SelectItem value="DEBIT">
                        <span className="flex items-center gap-1">
                          Cartão de débito
                        </span>
                      </SelectItem>
                      <SelectItem value="PIX">
                        <span className="flex items-center gap-1">PIX</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-1/5">Anotações</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adicione uma anotação (opcional)"
                      {...field}
                      className="rounded-lg border flex-1 w-full border-gray-300 bg-white text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!transactionId ? (
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost" type="button">
                    Cancelar
                  </Button>
                </DialogClose>

                <Button
                  disabled={loading}
                  type="submit"
                  className={`font-bold ${loading && "bg-opacity-75"}`}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </DialogFooter>
            ) : (
              <div className="text-right">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  className={`font-bold ${loading && "bg-opacity-75"}`}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};

export default TransactionForm;
