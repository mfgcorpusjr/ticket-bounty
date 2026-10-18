import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  isPending?: boolean;
  children: string;
} & ComponentProps<typeof Button>;

export default function SubmitButton({ isPending, children, ...rest }: Props) {
  return (
    <Button {...rest} disabled={isPending}>
      {isPending && <Spinner data-icon="inline-start" />}

      {children}
    </Button>
  );
}
