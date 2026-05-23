"use client";
import {useRouter} from "next/navigation"; 

export default function SearchBar() {
    const router = useRouter();

    function handleSearch(query: string) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    return (
    <form>
        <input
            className="flex w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-4 px-6"
            placeholder="What are you looking for?" 
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
        ></input>
    </form>
  );
}