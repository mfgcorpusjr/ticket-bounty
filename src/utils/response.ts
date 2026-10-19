import { ZodError } from "zod";

type Response = {
  success: boolean;
  message: string;
};

export const toSettle = (response: Response) => response;

export const toError = (error: unknown) => {
  if (error instanceof ZodError) {
    return toSettle({ success: false, message: "Validation failed" });
  } else if (error instanceof Error) {
    return toSettle({ success: false, message: error.message });
  } else {
    return toSettle({
      success: false,
      message: "An unknown error has occurred",
    });
  }
};
