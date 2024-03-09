"use server";

import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface updatePasswordProps {
  current_password: string;
  new_password: string;
}

export const updatePassword = async ({
  current_password,
  new_password,
}: updatePasswordProps) => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user.id;

  if (!user_id) {
    return {
      message: "User id is missing!",
      statusCode: 400,
    };
  }

  const res = await prismaClient.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (res?.password !== current_password) {
    return {
      message: "The provided password is wrong!",
      statusCode: 400,
    };
  }

  const user = await prismaClient.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      password: new_password,
    },
  });

  revalidatePath("/");

  return { user, statusCode: 200 };
};
