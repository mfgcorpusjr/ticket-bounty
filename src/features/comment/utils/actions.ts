"use server";

import { getSessionOrRedirect } from "@/features/auth/utils/helpers";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/entity";
import { response, errorResponse } from "@/utils/response";
import {
  type CreateCommentFormData,
  createCommentFormSchema,
} from "@/features/comment/utils/schemas";

export const createComment = async (
  formData: CreateCommentFormData,
  ticketId: string,
) => {
  const session = await getSessionOrRedirect();

  try {
    const parsedData = createCommentFormSchema.parse(formData);

    await prisma.comment.create({
      data: {
        ...parsedData,
        userId: session.user.id,
        ticketId,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }

  return response({
    success: true,
    message: "Comment created",
  });
};

export const deleteComment = async (id: string) => {
  const session = await getSessionOrRedirect();

  try {
    const foundComment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!foundComment || !isOwner(session.user.id, foundComment)) {
      return response({ success: false, message: "Unauthorized" });
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }

  return response({
    success: true,
    message: "Comment deleted",
  });
};
