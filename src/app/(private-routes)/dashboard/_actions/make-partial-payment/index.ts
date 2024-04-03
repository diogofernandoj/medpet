"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface MakePartialPaymentProps {
  transactionId: string;
  amount: number;
  paid: number;
}

export const makePartialPayment = async ({
  amount,
  paid,
  transactionId,
}: MakePartialPaymentProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  if (paid > amount) {
    return {
      message: "The partial payment cannot be higher than total.",
      statusCode: 400,
    };
  }

  const updatedTransaction = await prismaClient.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      amount: amount - paid,
    },
  });

  const paidTransaction = await prismaClient.transaction.create({
    data: {
      amount: paid,
      status: true,
      user_id: user_id,
      client_id: updatedTransaction.client_id,
      title: updatedTransaction.title,
      type: updatedTransaction.type,
      payment: updatedTransaction.payment,
      payment_date: new Date(new Date().setHours(0, 0, 0, 0)),
      notes: updatedTransaction.notes,
    },
  });

  const transactions = [updatedTransaction, paidTransaction];
  revalidatePath("/");

  return { transactions, statusCode: 200 };
};
