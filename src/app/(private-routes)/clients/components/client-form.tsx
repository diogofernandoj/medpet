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
import { Loader2Icon } from "lucide-react";
import PhoneInput from "./phone-input";
import DocumentInput from "./document-input";
import Link from "next/link";
import { addClient } from "../_actions/add-client";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Este campo é obrigatório!" }),
  document: z.string().trim(),
  phone: z.string().trim(),
  address: z.string().trim(),
  notes: z.string().trim(),
});

const ClientForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { name, document, phone, address, notes } = values;

    const res = await addClient({ name, document, phone, address, notes });

    if (res.message) {
      toast({
        description: "Falha ao cadastrar cliente",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    router.replace("/clients");
  };
  return (
    <Form {...form}>
      <Toaster />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-5">
              <FormLabel className="w-1/5">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do cliente"
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-5">
              <FormLabel className="w-1/5">CPF</FormLabel>
              <FormControl>
                <DocumentInput
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-5">
              <FormLabel className="w-1/5">Telefone</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-5">
              <FormLabel className="w-1/5">Endereço</FormLabel>
              <FormControl>
                <Input
                  placeholder="Endereço do cliente"
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-5">
              <FormLabel className="w-1/5">Anotações</FormLabel>
              <FormControl>
                <Input
                  placeholder="Anotações do cliente"
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full">
          <Link href="/clients">
            <Button variant="ghost" className="text-gray-500 font-medium">
              Cancelar
            </Button>
          </Link>
          <Button
            disabled={loading}
            type="submit"
            className={`rounded-full w-max font-bold ${
              loading && "bg-opacity-75"
            }`}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
