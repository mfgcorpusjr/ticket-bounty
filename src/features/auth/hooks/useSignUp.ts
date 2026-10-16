import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signUpFormSchema,
  type SignUpFormData,
} from "@/features/auth/utils/schemas";

const useSignUp = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = (formData: SignUpFormData) => {
    console.log(formData);
  };

  return { form, handleSignUp };
};

export default useSignUp;
