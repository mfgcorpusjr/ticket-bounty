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
import { Button } from "@/components/ui/button";

import type { TicketQuery } from "@/features/ticket/utils/types";

type Props = {
  ticketQuery: TicketQuery;
  metadata: {
    count: number;
    skip: number;
    take: number;
    hasNextPage: boolean;
  };
};

export default function Pagination({ ticketQuery, metadata }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageSize = (value: string) => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("pageSize", value);
    _searchParams.delete("page");

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

  const handlePreviousPage = () => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("page", String(ticketQuery.page - 1));

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

  const handleNextPage = () => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("page", String(ticketQuery.page + 1));

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <p className="text-xs text-muted-foreground">
        {metadata.skip + 1}-
        {Math.min(metadata.take * ticketQuery.page, metadata.count)} of{" "}
        {metadata.count}
      </p>

      <div className="flex items-center gap-2">
        <Select
          defaultValue={ticketQuery.pageSize.toString()}
          onValueChange={handlePageSize}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          disabled={ticketQuery.page === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!metadata.hasNextPage}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
