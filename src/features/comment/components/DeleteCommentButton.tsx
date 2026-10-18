import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  id: string;
};

export default function DeleteCommentButton({ id }: Props) {
  return (
    <Button variant="outline" size="icon">
      <TrashIcon />
    </Button>
  );
}
