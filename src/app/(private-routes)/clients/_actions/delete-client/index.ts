"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteClient = async ({ clientId }: { clientId: string }) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const client = await prismaClient.client.delete({
    where: {
      id: clientId,
    },
  });

  revalidatePath("/clients");

  return { client, statusCode: 200 };
};
