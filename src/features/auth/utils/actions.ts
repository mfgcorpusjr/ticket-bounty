"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import {
  type SignUpFormData,
  signUpFormSchema,
  type SignInFormData,
  signInFormSchema,
} from "@/features/auth/utils/schemas";
import { auth } from "@/lib/auth";
import { toError } from "@/utils/response";

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
    return toError(error);
  }

  redirect("/tickets");
};

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    return toError(error);
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
    return toError(error);
  }

  redirect("/tickets");
};
