"use server";

import { revalidatePath } from "next/cache";

import {
  UpsertTicketFormData,
  upsertTicketFormSchema,
} from "@/features/ticket/utils/schemas";
import type { AppTicket } from "@/features/ticket/utils/types";
import { getSessionOrRedirect } from "@/features/auth/utils/helpers";
import { prisma } from "@/lib/prisma";
import { response, errorResponse } from "@/utils/response";
import { isOwner } from "@/utils/entity";

export const upsertTicket = async (
  formData: UpsertTicketFormData,
  ticket?: AppTicket,
) => {
  const session = await getSessionOrRedirect();

  if (ticket) {
    const foundTicket = await prisma.ticket.findUnique({
      where: {
        id: ticket?.id,
      },
    });

    if (!foundTicket || !isOwner(session.user.id, foundTicket)) {
      return response({ success: false, message: "Unauthorized" });
    }
  }

  try {
    const parsedData = upsertTicketFormSchema.parse(formData);

    await prisma.ticket.upsert({
      create: {
        ...parsedData,
        userId: session.user.id,
      },
      update: parsedData,
      where: {
        id: ticket?.id ?? "",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }

  revalidatePath("/");
  revalidatePath("/tickets");

  return response({
    success: true,
    message: ticket ? "Ticket updated" : "Ticket created",
  });
};
