"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

import type { TicketQuery } from "@/features/ticket/utils/types";

type Props = {
  ticketQuery: TicketQuery;
  placeholder?: string;
};

export default function TicketSearchForm({
  ticketQuery,
  placeholder = "Search...",
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ticketQuery.search) {
      ref.current!.value = ticketQuery.search;
    }
  }, [ticketQuery]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const _searchParams = new URLSearchParams(searchParams);
    const _search = ref.current!.value.trim();
    if (_search) {
      _searchParams.set("search", _search);
    } else {
      _searchParams.delete("search");
    }
    _searchParams.delete("page");

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroupInput placeholder={placeholder} ref={ref} />

        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
