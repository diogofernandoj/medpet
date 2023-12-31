"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export const deleteTransaction = async ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const transaction = await prismaClient.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  return { transaction, statusCode: 200 };
};
