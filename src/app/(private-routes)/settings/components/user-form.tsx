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
import { updateUser } from "../_actions/update-user";
import { signOut } from "next-auth/react";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Este campo é obrigatório!" }),
  email: z.string().email({ message: "Insira um e-mail válido" }),
});

interface UserFormProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const UserForm = ({ user }: UserFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const capitalizedName = () => {
    const names = user.name.toLocaleLowerCase().split(" ");
    const name = names.map(
      (name) => name.charAt(0).toLocaleUpperCase() + name.slice(1)
    );

    return name.join(" ");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: capitalizedName(),
      email: user.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { name, email } = values;

    const res = await updateUser({ id: user.id, name, email });

    if (res?.message) {
      toast({
        description: "Algo deu errado!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      description: "Usuário atualizado com sucesso!",
      className: "bg-primary text-white font-bold",
    });
    setLoading(false);
    signOut();
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
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do usuário"
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
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email do usuário"
                  {...field}
                  className="rounded-sm bg-white focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full">
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

export default UserForm;
