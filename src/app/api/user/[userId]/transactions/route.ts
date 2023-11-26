import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const { userId, startDate, endDate, type } = req;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        message: "UserId is missing!",
        status: 400,
      })
    );
  }

  const earnings = await prismaClient.transaction.findMany({
    where: {
      AND: [
        {
          user_id: userId,
        },
        {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        {
          type,
        },
      ],
    },
  });

  return new NextResponse(JSON.stringify(earnings), { status: 200 });
}
