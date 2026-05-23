"use client";
import {useRouter} from "next/navigation"; 

export default function SearchBar(data?: any) {
    const router = useRouter();

    function handleSearch(query: string) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    const initialQuery = data?.query || "";

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
            defaultValue={initialQuery}
        ></input>
    </form>
  );
}
