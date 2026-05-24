"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResultLabel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
    
    const [value, setValue] = useState(query);
    
    useEffect(() => {
        setValue(query);
    }, [query]);

    function getLabelForQuery(query: string) {
        if (!query || query.trim() === "") {
            return "Please enter a search query.";
        }
        return `Showing results for "${query.trim()}"`;
    }

    return (
        <p className="mb-4">{getLabelForQuery(value)}</p>
    );
}