"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

import type { TicketQuery } from "@/features/ticket/utils/types";

type Props = {
  ticketQuery: TicketQuery;
};

export default function TicketSorter({ ticketQuery }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSort = (value: string) => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("orderBy", value);

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

  return (
    <Select defaultValue={ticketQuery.orderBy} onValueChange={handleSort}>
      <SelectTrigger className="flex-1">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
