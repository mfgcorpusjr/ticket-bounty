import { ZodError } from "zod";

export const renderResponse = (response: {
  success: boolean;
  message: string;
}) => {
  return response;
};

export const renderError = (error: unknown) => {
  if (error instanceof ZodError) {
    return renderResponse({ success: false, message: "Validation failed" });
  } else if (error instanceof Error) {
    return renderResponse({ success: false, message: error.message });
  } else {
    return renderResponse({
      success: false,
      message: "An unknown error has occurred",
    });
  }
};

export const isOwner = (userId: string, entity: { userId: string }) => {
  return userId === entity.userId;
};
