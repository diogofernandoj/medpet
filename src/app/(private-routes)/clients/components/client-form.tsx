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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Este campo é obrigatório!" }),
  document: z.string().trim(),
  phone: z.string().trim(),
  address: z.string().trim(),
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center space-y-0 gap-5">
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
            <FormItem className="flex items-center space-y-0 gap-5">
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="CPF do cliente"
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type="submit"
          className={`w-full rounded-3xl font-bold ${
            loading && "bg-opacity-75"
          }`}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;
