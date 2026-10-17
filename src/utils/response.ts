import { ZodError } from "zod";

type Response = {
  success: boolean;
  message: string;
};

export const response = (response: Response) => response;

export const errorResponse = (error: unknown) => {
  if (error instanceof ZodError) {
    return response({ success: false, message: "Validation failed" });
  } else if (error instanceof Error) {
    return response({ success: false, message: error.message });
  } else {
    return response({
      success: false,
      message: "An unknown error has occurred",
    });
  }
};
