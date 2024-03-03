"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { paymentMethodTypes, transactionTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface EditTransactionProps {
  transactionId: string;
  title: string;
  payment_date: Date;
  type: transactionTypes;
  status: boolean;
  amount: number;
  notes: string;
  payment: paymentMethodTypes;
}

export const editTransaction = async ({
  transactionId,
  title,
  payment_date,
  type,
  status,
  amount,
  notes,
  payment,
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
    payment_date,
    status,
    amount,
    type,
    notes,
    payment,
  };

  const transaction = await prismaClient.transaction.update({
    where: {
      id: transactionId,
    },
    data,
  });

  revalidatePath("/");

  return { transaction, statusCode: 200 };
};
