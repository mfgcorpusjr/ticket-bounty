import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DeleteTicketButton() {
  return (
    <Button variant="outline" size="icon">
      <TrashIcon />
    </Button>
  );
}
