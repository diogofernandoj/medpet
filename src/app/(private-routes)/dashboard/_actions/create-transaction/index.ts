"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { paymentMethodTypes, transactionTypes } from "@prisma/client";
import { getServerSession } from "next-auth";

interface CreateTransactionProps {
  title: string;
  payment_date: Date;
  type: transactionTypes;
  status: boolean;
  amount: number;
  installments: number;
  notes: string;
  payment: paymentMethodTypes;
  client_id?: string;
}

export const createTransaction = async ({
  title,
  payment_date,
  type,
  status,
  installments,
  amount,
  notes,
  payment,
  client_id,
}: CreateTransactionProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  let data: any[] = [];

  for (let i = 0; i < installments; i++) {
    if (i === 0) {
      data.push({
        user_id,
        title,
        payment_date: new Date(new Date(payment_date).setHours(0, 0, 0, 0)),
        type,
        status,
        amount,
        notes,
        payment,
      });
    } else {
      data.push({
        user_id,
        title,
        payment_date: new Date(
          new Date(payment_date).getFullYear(),
          new Date(payment_date).getMonth() + i,
          1,
          0,
          0,
          0,
          0
        ),
        type,
        status: false,
        amount,
        notes,
        payment,
      });
    }
  }

  if (client_id) {
    data.forEach((item) => (item["client_id"] = client_id));
  }

  const transactions = await prismaClient.transaction.createMany({
    data,
  });

  return { transactions, statusCode: 200 };
};
