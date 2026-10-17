import type { Ticket } from "@/generated/prisma/client";

export type AppTicket = Omit<Ticket, "bounty"> & { bounty: number };
