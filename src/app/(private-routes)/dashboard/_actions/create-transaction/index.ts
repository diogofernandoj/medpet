"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { transactionTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface CreateTransactionProps {
  title: string;
  date: Date;
  type: transactionTypes;
  status: boolean;
  amount: number;
  installments: number;
  notes: string;
}

export const createTransaction = async ({
  title,
  date,
  type,
  status,
  installments,
  amount,
  notes,
}: CreateTransactionProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  let data = [];

  for (let i = 0; i < installments; i++) {
    if (i === 0) {
      data.push({
        user_id,
        title,
        date: new Date(date),
        type,
        status,
        amount,
        notes,
      });
    } else {
      data.push({
        user_id,
        title,
        date: new Date(
          new Date(date).getFullYear(),
          new Date(date).getMonth() + i,
          1
        ),
        type,
        status: false,
        amount,
        notes,
      });
    }
  }

  const transactions = await prismaClient.transaction.createMany({
    data,
  });

  revalidatePath("/dashboard");

  return { transactions, statusCode: 200 };
};
