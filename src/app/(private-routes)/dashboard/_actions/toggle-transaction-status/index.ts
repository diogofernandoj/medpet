"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface toggleTransactionStatusProps {
  transactionId: string;
}

export const toggleTransactionStatus = async ({
  transactionId,
}: toggleTransactionStatusProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const transaction = await prismaClient.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      status: true,
      payment_date: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  revalidatePath("/");

  return { transaction, statusCode: 200 };
};
