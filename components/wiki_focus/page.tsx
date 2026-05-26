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
        try {
            setLoading(true);

            const encoded = encodeURIComponent(query);

            const res = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`
            );

            const data = await res.json();

            console.log(data);

            setResults(data);
        } catch (err) {
            console.error(err);
            setResults(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        var result = fetchResults(value);
        if (result != null) {
            setLoading(false);
        }
    }, [value]);

    if (loading == false && results != null && results.title) {

        if (results.type?.includes("not_found")) {
            setResults(null);
            return;
        }

        return (
            <div className="w-full flex flex-row card items-center mb-4">
                <div>
                    {results.thumbnail?.source && (
                        <img
                            src={results.thumbnail.source}
                            alt={results.titles.normalized}
                            className="w-full object-cover rounded mb-4 banner-image"
                        />
                    )}
                    <h1 className="text-xl font-bold">{results.titles.normalized}</h1>
                    <p className="text-gray-500 mb-4">{results.extract}</p>
                    <a href={results.content_urls.desktop.page} target="_blank" className="text-blue-500 mt-4">Read more on Wikipedia</a>
                </div>
            </div>
        );
    }
    else {
        return null;
    }

}