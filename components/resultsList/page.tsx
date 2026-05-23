"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResultList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
    
    const [value, setValue] = useState(query);
    
    useEffect(() => {
        setValue(query);
    }, [query]);

    function getResults(query: string) {
        
        const urls = [
            "https://www.wikipedia.org/",
            "https://www.google.com/",
            "https://www.youtube.com/",
            "https://www.facebook.com/",
            "https://www.twitter.com/",
        ]

        var results = urls.filter(url => url.includes(query));

        return results
    }

    return (
        <div>
            {getResults(value).map((result, index) => (
                <div key={index} className="mb-4 p-4 border rounded">{result}</div>
            ))}
        </div>
    );
}