import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
