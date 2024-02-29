"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

interface toggleTransactionStatusProps {
  transactionId: string;
  status: boolean;
}

export const toggleTransactionStatus = async ({
  transactionId,
  status,
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
      status,
    },
  });

  return { transaction, statusCode: 200 };
};
