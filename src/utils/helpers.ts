import { ZodError } from "zod";

export const renderError = (error: unknown) => {
  if (error instanceof ZodError) {
    return { success: false, message: "Validation failed" };
  } else if (error instanceof Error) {
    return { success: false, message: error.message };
  } else {
    return { success: false, message: "An unknown error has occurred" };
  }
};
