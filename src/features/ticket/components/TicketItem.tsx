import Link from "next/link";
import { SquareArrowOutUpRightIcon, PencilIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TicketItemTitle from "@/features/ticket/components/TicketItemTitle";
import DeleteTicketButton from "@/features/ticket/components/DeleteTicketButton";
import TicketMoreMenu from "@/features/ticket/components/TicketMoreMenu";

import type { AppTicket } from "@/features/ticket/utils/types";
import { formatCurrency } from "@/utils/currency";
import { getSession } from "@/features/auth/utils/helpers";
import { isOwner } from "@/utils/entity";

type Props = {
  ticket: AppTicket & { user: { email: string } };
  isDetail?: boolean;
};

export default async function TicketItem({ ticket, isDetail }: Props) {
  const session = await getSession();
  const _isOwner = isOwner(session?.user.id ?? "", ticket);

  const ticketDetailsLink = (
    <Button asChild variant="outline" size="icon">
      <Link href={`/tickets/${ticket.id}`}>
        <SquareArrowOutUpRightIcon />
      </Link>
    </Button>
  );

  const editTicketLink = (
    <Button asChild variant="outline" size="icon">
      <Link href={`/tickets/${ticket.id}/edit`}>
        <PencilIcon />
      </Link>
    </Button>
  );

  return (
    <div className="flex gap-2">
      <Card className="flex-1">
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

      <div className="flex flex-col gap-2">
        {isDetail ? (
          <>
            {_isOwner && (
              <>
                {editTicketLink} <DeleteTicketButton /> <TicketMoreMenu />
              </>
            )}
          </>
        ) : (
          <>
            {_isOwner ? (
              <>
                {ticketDetailsLink} {editTicketLink}
              </>
            ) : (
              <>{ticketDetailsLink}</>
            )}
          </>
        )}
      </div>
    </div>
  );
}
