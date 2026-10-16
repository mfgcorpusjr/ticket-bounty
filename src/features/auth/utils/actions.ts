"use server";

import { redirect } from "next/navigation";

import {
  SignUpFormData,
  signUpFormSchema,
} from "@/features/auth/utils/schemas";
import { auth } from "@/lib/auth";
import { renderError } from "@/utils/helpers";

export const signUp = async (formData: SignUpFormData) => {
  try {
    const parsedData = signUpFormSchema.parse(formData);

    await auth.api.signUpEmail({
      body: {
        ...parsedData,
        name: parsedData.email,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/tickets");
};
