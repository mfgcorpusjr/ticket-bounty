import {
  UpsertTicketFormData,
  upsertTicketFormSchema,
} from "@/features/ticket/utils/schemas";
import { getSessionOrRedirect } from "@/features/auth/utils/helpers";
import { prisma } from "@/lib/prisma";
import { isOwner, renderError, renderResponse } from "@/utils/helpers";

export const upsertTicket = async (
  formData: UpsertTicketFormData,
  id?: string,
) => {
  const session = await getSessionOrRedirect();

  if (id) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !isOwner(session.user.id, ticket)) {
      return renderResponse({ success: false, message: "Unauthorized" });
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
        id,
      },
    });

    return renderResponse({
      success: true,
      message: id ? "Ticket updated" : "Ticket created",
    });
  } catch (error) {
    return renderError(error);
  }
};
