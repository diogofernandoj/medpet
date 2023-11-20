"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
  const router = useRouter();

  const handleSignOutClick = async () => {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  };

  return <Button onClick={handleSignOutClick}>Sair</Button>;
};

export default SignoutButton;
