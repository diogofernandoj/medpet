"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export const getClients = async ({ search }: { search: string }) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "UserId is missing!",
      statusCode: 400,
    };
  }

  const clients = await prismaClient.client.findMany({
    where: {
      OR: [
        {
          name: { contains: search },
        },
        {
          document: search,
        },
        {
          id: search,
        },
      ],
    },
  });

  return { clients, statusCode: 200 };
};
