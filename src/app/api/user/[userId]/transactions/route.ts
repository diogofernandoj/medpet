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

  let generateSearchQuery = () => {
    let searchQuery: any = {
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
      ],
    };

    if (type) {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            type,
          },
          {
            status: true,
          },
        ],
      };
    }

    return searchQuery;
  };

  const earnings = await prismaClient.transaction.findMany({
    where: generateSearchQuery(),
  });

  return new NextResponse(JSON.stringify(earnings), { status: 200 });
}
