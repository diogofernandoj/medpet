"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import {
  Transaction,
  paymentMethodTypes,
  transactionTypes,
} from "@prisma/client";
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
  payment: paymentMethodTypes;
  client_id?: string;
  pet_id?: string;
}

export const createTransaction = async ({
  title,
  date,
  type,
  status,
  installments,
  amount,
  notes,
  payment,
  client_id,
  pet_id,
}: CreateTransactionProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  let data: Transaction[] = [];

  for (let i = 0; i < installments; i++) {
    if (i === 0) {
      data.push({
        user_id,
        title,
        date: new Date(new Date(date).setHours(-3, 0, 0, 0)),
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
        date: new Date(
          new Date(date).getFullYear(),
          new Date(date).getMonth() + i,
          1,
          -3,
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

  if (pet_id) {
    data.forEach((item) => (item["pet_id"] = pet_id));
  }

  const transactions = await prismaClient.transaction.createMany({
    data,
  });

  return { transactions, statusCode: 200 };
};
