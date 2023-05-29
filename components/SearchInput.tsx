"use client";

import { useState } from "react";
import { Input } from "./Input";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

export default function SearchInput() {
  const router = useRouter();

  function pushToRouter(term: string) {
    const encodedSearchTerm = encodeURI(term);
    router.push(`?q=${encodedSearchTerm}`);
  }

  const debouncedPush = debounce(pushToRouter, 1000);

  return (
    <Input
      type="search"
      placeholder="search for tags, terms"
      onChange={(event) => debouncedPush(event.currentTarget.value)}
    />
  );
}
