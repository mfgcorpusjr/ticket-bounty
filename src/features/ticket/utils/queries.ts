import { prisma } from "@/lib/prisma";
import { castTicketBountyToNumber } from "@/features/ticket/utils/helpers";

export const getTicket = async (id: string) => {
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  return ticket ? castTicketBountyToNumber(ticket) : null;
};
