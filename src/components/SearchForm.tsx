"use client";

import { useState } from "react";
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

export default function SearchForm({
  ticketQuery,
  placeholder = "Search...",
}: Props) {
  const [search, setSearch] = useState(ticketQuery.search || "");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const _searchParams = new URLSearchParams(searchParams);
    const _search = search.trim();
    if (_search) {
      _searchParams.set("search", search.trim());
    } else {
      _searchParams.delete("search");
    }
    _searchParams.delete("page");

    router.push(`${pathname}?${_searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroupInput
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
