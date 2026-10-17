import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TicketItemTitle from "@/features/ticket/components/TicketItemTitle";

import type { AppTicket } from "@/features/ticket/utils/types";
import { formatCurrency } from "@/utils/currency";

type Props = {
  ticket: AppTicket & { user: { email: string } };
};

export default function TicketItem({ ticket }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TicketItemTitle ticket={ticket} />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p>{ticket.content}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center gap-8 text-xs text-muted-foreground">
        <p>
          {format(ticket.deadline, "yyyy-MM-dd")} by {ticket.user.email}
        </p>

        <p>{formatCurrency(ticket.bounty)}</p>
      </CardFooter>
    </Card>
  );
}
