"use client";
import {useSearchParams, useRouter} from "next/navigation"; 

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q") ?? "";

    function handleSearch(query: string) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    return (
    <form className="flex w-full" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search") as string;
        handleSearch(query);
    }}>
        <input
            className="flex w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-4 px-6"
            placeholder="What are you looking for?" 
            name="search"
            defaultValue={searchQuery}
        ></input>
    </form>
  );
}
