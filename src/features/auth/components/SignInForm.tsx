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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import useSignIn from "@/features/auth/hooks/useSignIn";

export default function SignInForm() {
  const { form, handleSignIn, isPending } = useSignIn();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="flex flex-col gap-4"
        >
          <FormInput name="email" control={form.control} placeholder="Email" />

          <FormInput
            name="password"
            control={form.control}
            type="password"
            placeholder="Password"
          />

          <Button disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <Link href="/sign-up" className="text-muted-foreground">
          No account yet?
        </Link>
      </CardFooter>
    </Card>
  );
}
