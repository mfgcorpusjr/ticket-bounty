import { prisma } from "@/lib/prisma";
import { castTicketBountyToNumber } from "@/features/ticket/utils/helpers";

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

export const getTickets = async (userId?: string) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tickets.map((ticket) => ({
    ...ticket,
    ...castTicketBountyToNumber(ticket),
  }));
};
