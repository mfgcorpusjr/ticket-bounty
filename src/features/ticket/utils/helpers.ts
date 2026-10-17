import type { Ticket } from "@/generated/prisma/client";

export const assertTicketBountyToNumber = (ticket: Ticket) => {
  return { ...ticket, bounty: ticket.bounty.toNumber() };
};
