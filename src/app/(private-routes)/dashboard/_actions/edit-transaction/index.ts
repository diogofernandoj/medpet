"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { transactionTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface EditTransactionProps {
  transactionId: string;
  title: string;
  date: Date;
  type: transactionTypes;
  status: boolean;
  amount: number;
  notes: string;
}

export const editTransaction = async ({
  transactionId,
  title,
  date,
  type,
  status,
  amount,
  notes,
}: EditTransactionProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const data = {
    user_id,
    title,
    date,
    status,
    amount,
    type,
    notes,
  };

  const transaction = await prismaClient.transaction.update({
    where: {
      id: transactionId,
    },
    data,
  });

  revalidatePath("/dashboard");

  return { transaction, statusCode: 200 };
};
