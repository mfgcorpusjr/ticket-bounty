import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  signInFormSchema,
  type SignInFormData,
} from "@/features/auth/utils/schemas";
import { signIn } from "@/features/auth/utils/actions";

const useSignIn = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (formData: SignInFormData) => {
    startTransition(async () => {
      const { success, message } = await signIn(formData);

      if (!success) {
        toast.error(message);
      }
    });
  };

  return { form, handleSignIn, isPending };
};

export default useSignIn;
