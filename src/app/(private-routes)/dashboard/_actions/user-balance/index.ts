"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface UserTransactionsProps {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export const getUserTransactions = async ({
  startDate,
  endDate,
}: UserTransactionsProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "UserId is missing!",
      statusCode: 400,
    };
  }

  let generateSearchQuery = () => {
    let searchQuery: any = {
      AND: [
        {
          user_id,
        },
      ],
    };

    if (startDate && !endDate) {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            date: {
              gte: new Date(startDate),
            },
          },
        ],
      };
    }

    if (startDate && endDate) {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
        ],
      };
    }

    return searchQuery;
  };

  const transactions = await prismaClient.transaction.findMany({
    where: generateSearchQuery(),
  });

  revalidatePath("/dashboard");

  return { transactions, statusCode: 200 };
};
