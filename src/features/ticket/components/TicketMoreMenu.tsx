import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TicketMoreMenu() {
  return (
    <Button variant="outline" size="icon">
      <EllipsisVertical />
    </Button>
  );
}
