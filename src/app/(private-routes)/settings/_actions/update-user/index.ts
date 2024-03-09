"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface updateUserProps {
  id: string;
  name: string;
  email: string;
}

export const updateUser = async ({ id, name, email }: updateUserProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const client = await prismaClient.user.update({
    where: {
      id,
    },
    data: {
      name: name.toUpperCase(),
      email: email.toLowerCase(),
    },
  });

  revalidatePath("/");

  return { client, statusCode: 200 };
};
