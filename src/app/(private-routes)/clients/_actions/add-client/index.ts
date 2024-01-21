"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface addClientProps {
  name: string;
  document: string;
  phone: string;
  address: string;
}

export const addClient = async ({
  name,
  document,
  phone,
  address,
}: addClientProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const client = await prismaClient.client.create({
    data: {
      user_id,
      name,
      document,
      phone,
      address,
    },
  });

  revalidatePath("/clients");

  return { client, statusCode: 200 };
};
