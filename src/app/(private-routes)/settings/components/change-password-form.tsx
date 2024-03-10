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
import { updatePassword } from "../_actions/update-password";
import { signOut } from "next-auth/react";

const formSchema = z.object({
  current_password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 dígitos",
  }),
  new_password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 dígitos",
  }),
});

const ChangePasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { current_password, new_password } = values;

    const res = await updatePassword({ current_password, new_password });

    if (res?.message) {
      toast({
        description: "As senhas não conferem!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      description: "Senha alterada com sucesso!",
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
          name="current_password"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Senha atual</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira a senha atual"
                  type="password"
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
          name="new_password"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0 gap-2">
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Insira a nova senha"
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

export default ChangePasswordForm;
