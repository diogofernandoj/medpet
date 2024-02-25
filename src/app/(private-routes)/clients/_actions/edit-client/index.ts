"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface editClientProps {
  id: string;
  name: string;
  document: string;
  phone: string;
  address: string;
}

export const editClient = async ({
  id,
  name,
  document,
  phone,
  address,
}: editClientProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const client = await prismaClient.client.update({
    where: {
      id,
    },
    data: {
      name: name.toUpperCase(),
      document,
      phone,
      address: address.toUpperCase(),
    },
  });

  revalidatePath("/clients");

  return { client, statusCode: 200 };
};
