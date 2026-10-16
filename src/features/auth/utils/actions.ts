"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import {
  SignUpFormData,
  signUpFormSchema,
  SignInFormData,
  signInFormSchema,
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

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/sign-in");
};

export const signIn = async (formData: SignInFormData) => {
  try {
    const parsedData = signInFormSchema.parse(formData);

    await auth.api.signInEmail({
      body: parsedData,
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/tickets");
};
