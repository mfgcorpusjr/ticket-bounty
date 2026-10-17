import { prisma } from "@/lib/prisma";
import { castTicketBountyToNumber } from "@/features/ticket/utils/helpers";

export const getTicket = async (id: string) => {
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  return ticket ? castTicketBountyToNumber(ticket) : null;
};

export const getTickets = async () => {
  const tickets = await prisma.ticket.findMany({
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
