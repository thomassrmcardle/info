"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  function handleSearch(query: string) {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form className="flex w-full" onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = (formData.get("search") as string) ?? "";
      handleSearch(query);
    }}>
      <input
        className="flex w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-4 px-6"
        placeholder="What are you looking for?"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}