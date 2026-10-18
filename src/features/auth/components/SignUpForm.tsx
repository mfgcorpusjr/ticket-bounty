"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";

import useSignUp from "@/features/auth/hooks/useSignUp";

export default function SignUpForm() {
  const { form, handleSignUp, isPending } = useSignUp();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="flex flex-col gap-4"
        >
          <FormInput name="email" control={form.control} placeholder="Email" />

          <FormInput
            name="password"
            control={form.control}
            type="password"
            placeholder="Password"
          />

          <FormInput
            name="confirmPassword"
            control={form.control}
            type="password"
            placeholder="Confirm Password"
          />

          <SubmitButton isPending={isPending}>Sign Up</SubmitButton>
        </form>
      </CardContent>

      <CardFooter>
        <Link href="/sign-in" className="text-muted-foreground">
          Have an account? Sign in now.
        </Link>
      </CardFooter>
    </Card>
  );
}
