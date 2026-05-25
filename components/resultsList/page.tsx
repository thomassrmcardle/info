"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResultList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
    
    const [value, setValue] = useState(query);
    const [results, setResults] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setValue(query);
    }, [query]);


    async function fetchResults(query: string) {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        console.log(data.results);
        return data.results;
    }

    async function getResults(query: string) {
        if (!query || query.trim() === "") {
            return []; // Return an empty array if the query is empty or only contains whitespace
        }

        var query = query.toLowerCase();
        var newResults = await fetchResults(query);

        return newResults
    }

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            const res = await getResults(value);
            if (mounted) {
                setResults(res ?? []);
                setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [value]);


    function resultsStack() {
        if (loading == true) {
            return (
                <div className="w-full flex flex-col items-center justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                        <div key={index} className="w-full mb-4 p-4 border rounded flex flex-col loader_card animate-pulse">
                            <div className="w-full flex flex-row justify-start items-center">
                                <div className="h-4 w-1/4 rounded bg-slate-200"></div>
                            </div>
                            <div className="mt-4 h-4 w-full rounded bg-slate-200"></div>
                            <div className="mt-2 h-4 w-3/4 rounded bg-slate-200"></div>
                            <div className="mt-4 h-4 w-1/4 rounded bg-slate-200"></div>
                        </div>
                    ))}
                </div>
            );
        }
        else {
            return (
                <div className="w-full flex flex-col items-center justify-start">
                    {results.map((result : any, index : number) => (
                        <a className="w-full" href={`https://${result.url}`} rel="noopener noreferrer">
                            <div key={index} className="w-full mb-4 p-4 border rounded flex flex-col card">
                                <div className="w-full flex flex-row justify-start items-center">
                                    <img src={`https://www.google.com/s2/favicons?domain=${result.url}`} alt="favicon" className="w-4 h-4 mr-2" />
                                    <p className="text-blue-500">{result.title}</p>
                                </div>
                                {result.description && <p className="mt-1">{result.description}</p>}
                                <p className="text-gray-600 text-sm">{result.url}</p>
                            </div>
                        </a>
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-start">
            {resultsStack()}
        </div>
    );

}