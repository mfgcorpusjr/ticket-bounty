import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  signUpFormSchema,
  type SignUpFormData,
} from "@/features/auth/utils/schemas";
import { signUp } from "@/features/auth/utils/actions";

const useSignUp = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handleSignUp = (formData: SignUpFormData) => {
    startTransition(async () => {
      const { success, message } = await signUp(formData);

      if (!success) {
        toast.error(message);
      }
    });
  };

  return { form, handleSignUp, isPending };
};

export default useSignUp;
