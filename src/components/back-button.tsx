"use client";

import { ArrowLeftCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()}>
      <ArrowLeftCircle size={36} className="text-primary" />
    </Button>
  );
};

export default BackButton;
