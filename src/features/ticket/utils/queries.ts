import { prisma } from "@/lib/prisma";
import { castTicketBountyToNumber } from "@/features/ticket/utils/helpers";
import type { TicketQuery } from "@/features/ticket/utils/types";
import type { TicketWhereInput } from "@/generated/prisma/models";

export const getTicket = async (id: string) => {
  const ticket = await prisma.ticket.findUnique({
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
    where: {
      id,
    },
  });

  return ticket ? { ...ticket, ...castTicketBountyToNumber(ticket) } : null;
};

export const getTickets = async (ticketQuery: TicketQuery, userId?: string) => {
  const where: TicketWhereInput = {
    userId,
    title: {
      contains: ticketQuery.search,
      mode: "insensitive",
    },
  };

  const skip = (ticketQuery.page - 1) * ticketQuery.pageSize;
  const take = ticketQuery.pageSize;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: ticketQuery.orderBy === "newest" ? "desc" : "asc",
      },
      skip,
      take,
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    tickets: tickets.map((ticket) => ({
      ...ticket,
      ...castTicketBountyToNumber(ticket),
    })),
    metadata: {
      count,
      skip,
      take,
      hasNextPage: count > skip + take,
    },
  };
};
