import { prisma } from "@/lib/prisma";
import { assertTicketBountyToNumber } from "@/features/ticket/utils/helpers";

export const getTicket = async (id: string) => {
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  return ticket ? assertTicketBountyToNumber(ticket) : null;
};
