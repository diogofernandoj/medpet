"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export const getClientTransactions = async ({
  clientId,
}: {
  clientId: string;
}) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "UserId is missing!",
      statusCode: 400,
    };
  }

  const transactions = await prismaClient.transaction.findMany({
    where: {
      client_id: clientId,
    },
  });

  console.log(transactions);

  return { transactions, statusCode: 200 };
};
