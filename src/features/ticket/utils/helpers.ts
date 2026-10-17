import type { Ticket } from "@/generated/prisma/client";

export const castTicketBountyToNumber = (ticket: Ticket) => {
  return { ...ticket, bounty: ticket.bounty.toNumber() };
};
