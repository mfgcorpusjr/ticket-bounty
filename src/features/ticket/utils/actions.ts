"use server";

import { revalidatePath } from "next/cache";

import {
  UpsertTicketFormData,
  upsertTicketFormSchema,
} from "@/features/ticket/utils/schemas";
import { getSessionOrRedirect } from "@/features/auth/utils/helpers";
import { prisma } from "@/lib/prisma";
import { response, errorResponse } from "@/utils/response";
import { isOwner } from "@/utils/entity";
import { TicketStatus } from "@/generated/prisma/enums";

export const upsertTicket = async (
  formData: UpsertTicketFormData,
  id?: string,
) => {
  const session = await getSessionOrRedirect();

  try {
    if (id) {
      const foundTicket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });

      if (!foundTicket || !isOwner(session.user.id, foundTicket)) {
        return response({ success: false, message: "Unauthorized" });
      }
    }

    const parsedData = upsertTicketFormSchema.parse(formData);

    await prisma.ticket.upsert({
      create: {
        ...parsedData,
        userId: session.user.id,
      },
      update: parsedData,
      where: {
        id: id ?? "",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }

  revalidatePath("/");
  revalidatePath("/tickets");

  return response({
    success: true,
    message: id ? "Ticket updated" : "Ticket created",
  });
};

export const deleteTicket = async (id: string) => {
  const session = await getSessionOrRedirect();

  try {
    const foundTicket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!foundTicket || !isOwner(session.user.id, foundTicket)) {
      return response({ success: false, message: "Unauthorized" });
    }

    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }

  revalidatePath("/");
  revalidatePath("/tickets");

  return response({
    success: true,
    message: "Ticket deleted",
  });
};

export const updateTicketStatus = async (status: TicketStatus, id: string) => {
  const session = await getSessionOrRedirect();

  try {
    const foundTicket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!foundTicket || !isOwner(session.user.id, foundTicket)) {
      return response({ success: false, message: "Unauthorized" });
    }

    await prisma.ticket.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }

  revalidatePath("/");
  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);

  return response({
    success: true,
    message: "Ticket status updated",
  });
};
