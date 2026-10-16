import { useTransition } from "react";
import { toast } from "sonner";

import { signOut } from "@/features/auth/utils/actions";

const useSignOut = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const { success, message } = await signOut();

      if (!success) {
        toast.error(message);
      }
    });
  };

  return { isPending, handleSignOut };
};

export default useSignOut;
