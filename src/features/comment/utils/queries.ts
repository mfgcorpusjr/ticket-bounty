"use server";

import { getSession } from "@/features/auth/utils/helpers";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/entity";

export const getComments = async (ticketId: string, page: number) => {
  const session = await getSession();

  const pageSize = 5;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where = {
    ticketId,
  };

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      skip,
      take,
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    comments: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(session?.user.id ?? "", comment),
    })),
    metadata: {
      hasNextPage: count > skip + take,
    },
  };
};
