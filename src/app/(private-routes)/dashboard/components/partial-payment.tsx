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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import { DollarSign, Loader2Icon } from "lucide-react";
import CurrencyInput from "./currency-input";
import { makePartialPayment } from "../_actions/make-partial-payment";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DateRangeContext } from "@/app/providers/date-range";

const PartialPayment = ({
  transactionId,
  amount,
}: {
  transactionId: string;
  amount: any;
}) => {
  const formSchema = z.object({
    paid: z
      .string({ required_error: "O valor deve ser maior que 0." })
      .trim()
      .min(1, { message: "O valor deve ser maior que 0." })
      .refine((value) => parseFloat(value.replace(",", ".")) > 0, {
        message: "O valor deve ser maior que 0.",
      })
      .refine((value) => parseFloat(value.replace(",", ".")) < amount, {
        message: "O valor parcial não pode ser superior ao valor total.",
      }),
  });

  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { setRevalidateTransactions } = useContext(DateRangeContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paid: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const res = await makePartialPayment({
      transactionId,
      paid: parseFloat(values.paid.replace(",", ".")),
      amount: parseFloat(amount.replace(",", ".")),
    });

    if (res.message) {
      setLoading(false);
      toast({
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    setRevalidateTransactions((prev) => prev + 1);
    setLoading(false);
    setOpen(false);
    toast({
      title: "Pagamento parcial realizado com sucesso!",
      className: "bg-primary font-bold text-white",
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="hover:bg-gray-100 w-full">
        <button className="flex items-center gap-1 font-medium text-xs p-1">
          <DollarSign size={14} /> Parcial
        </button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="font-bold text-xl text-primary mb-10">
              Pagamento parcial
            </h2>
            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 w-full flex-1 space-y-0 px-10">
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      decimalsLimit={2}
                      placeholder="R$0,00"
                      onValueChange={field.onChange}
                      value={field.value}
                      onBlur={field.onBlur}
                      className="flex-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-10">
              <Button
                disabled={loading}
                type="submit"
                className={`w-full rounded-3xl font-bold ${
                  loading && "bg-opacity-75"
                }`}
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartialPayment;
