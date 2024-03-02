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

  const res = await prismaClient.transaction.findMany({
    where: {
      client_id: clientId,
    },
  });

  const transactions = res?.sort(
    (a, b) => Number(b.payment_date) - Number(a.payment_date)
  );

  return { transactions, statusCode: 200 };
};
