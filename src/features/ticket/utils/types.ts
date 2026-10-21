import type { Ticket } from "@/generated/prisma/client";

export type AppTicket = Omit<Ticket, "bounty"> & { bounty: number };

export type TicketQuery = {
  page: number;
  pageSize: number;
  search?: string;
};
