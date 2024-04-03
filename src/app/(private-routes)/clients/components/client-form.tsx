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
import { editClient } from "../_actions/edit-client";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Este campo é obrigatório!" }),
  document: z.string(),
  phone: z.string(),
  address: z.string().trim().min(4, { message: "Este campo é obrigatório" }),
});

interface ClientFormProps {
  client?: {
    id: string;
    name: string;
    document: string;
    phone: string;
    address: string;
  };
}

const ClientForm = ({ client }: ClientFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name || "",
      document: client?.document || "",
      phone: client?.phone || "",
      address: client?.address || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { name, document, phone, address } = values;

    if (client) {
      const res = await editClient({
        id: client.id,
        name,
        document,
        phone,
        address,
      });

      if (res.message) {
        toast({
          description: "Falha ao cadastrar cliente",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        description: "Cliente atualizado com sucesso!",
        className: "bg-primary text-white font-bold",
      });
      setLoading(false);
      return;
    }

    const res = await addClient({ name, document, phone, address });

    if (res.message) {
      toast({
        description: "Falha ao cadastrar cliente",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    router.replace("/clients");
    toast({
      title: "Cliente adicionado com sucesso!",
      className: "bg-primary text-white font-bold",
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Nome</FormLabel>
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
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>CPF</FormLabel>
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
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Telefone</FormLabel>
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
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Endereço</FormLabel>
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
