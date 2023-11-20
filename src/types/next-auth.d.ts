import { Transaction } from "@prisma/client";
import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      transactions: Transaction[];
    };
  }
}
