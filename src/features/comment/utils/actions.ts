"use server";

import { getSessionOrRedirect } from "@/features/auth/utils/helpers";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/entity";
import { response, errorResponse } from "@/utils/response";

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
