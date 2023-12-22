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
  email: z.string().email({ message: "Insira um e-mail válido" }),
  password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 dígitos",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      toast({
        description: "Os dados inseridos são inválidos!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
  };
  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira seu email"
                  {...field}
                  className="rounded-3xl focus-visible:ring-1 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira sua senha"
                  {...field}
                  className="rounded-3xl focus-visible:ring-1 focus-visible:ring-offset-0"
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

export default LoginForm;
