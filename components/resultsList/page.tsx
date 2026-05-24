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

        if (!query || query.trim() === "") {
            return []; // Return an empty array if the query is empty or only contains whitespace
        }
        
        const urls = [
            "https://www.wikipedia.org/",
            "https://www.google.com/",
            "https://www.youtube.com/",
            "https://www.facebook.com/",
            "https://www.twitter.com/",
        ]

        var results = urls.filter(url => url.includes(query.trim()));

        return results
    }

    return (
        <div className="w-full flex flex-col items-center justify-start">
            {getResults(value).map((result, index) => (
                <div key={index} className="w-full mb-4 p-4 border rounded flex flex-col">
                    <div className="w-full flex flex-row justify-start items-center">
                        <img src={`https://www.google.com/s2/favicons?domain=${result}`} alt="favicon" className="w-4 h-4 mr-2" />
                        <p className="text-blue-500">{result}</p>
                    </div>
                    <p>A brief description of {result}, likely from the site's metadata.</p>
                    <p className="text-gray-600 text-sm">{result}</p>
                </div>
            ))}
        </div>
    );

}