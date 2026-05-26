"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function WikiFocus() {

    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
        
    const [value, setValue] = useState(query);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
        
    useEffect(() => {
        setValue(query);
    }, [query]);


    async function fetchResults(query: string) {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query.toLowerCase()}`);
        const data = await res.json();
        console.log(data);
        setResults(data);
        return data;
    }

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetchResults(value);
            setLoading(false);
        })();
    }, [value]);

    if ((!query || query.trim() === "") && loading == false && results != null && results.title) {
        return (
            <div className="w-full flex flex-col card items-center">
                <h1 className="text-xl font-bold">{results.titles.canonical}</h1>
                <p className="text-gray-500">{results.extract}</p>
                <a href={results.content_urls.desktop.page} target="_blank" className="text-blue-500 mt-4">Read more on Wikipedia</a>
            </div>
        );
    }
    else {
        return null;
    }

}