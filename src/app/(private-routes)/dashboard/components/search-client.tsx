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
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { getClients } from "../_actions/get-clients";
import { DataTable } from "../clients/data-table";
import { columns } from "../clients/columns";

interface SearchClientProps {
  setClientId: (id: string) => void;
  setModal: (boolean: boolean) => void;
}

const formSchema = z.object({
  search: z
    .string()
    .trim()
    .min(2, { message: "Esse campo não pode ficar em branco" }),
});

const SearchClient = ({ setClientId, setModal }: SearchClientProps) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const res = await getClients({ search: values.search });

    if (res?.message) {
      toast({
        description: "Algo deu errado!",
        variant: "destructive",
      });
      return;
    }
    setLoading(false);

    setClients(res.clients);
  };

  const [clients, setClients] = useState<any>(undefined);

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <Toaster />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center w-full gap-1"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Buscar cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome ou CPF do cliente"
                    {...field}
                    className="rounded-xl flex-1 focus-visible:ring-1 focus-visible:ring-offset-0 bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className={`rounded-xl w-20 font-bold mt-8 ${
              loading && "bg-opacity-75"
            }`}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Buscar"}
          </Button>
        </form>
      </Form>
      {clients && (
        <DataTable
          setModal={setModal}
          setClientId={setClientId}
          columns={columns}
          data={clients}
        />
      )}
    </div>
  );
};

export default SearchClient;
