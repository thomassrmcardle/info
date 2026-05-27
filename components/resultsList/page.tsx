"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import WikiFocus from "../wiki_focus/page";

export default function ResultList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [results, setResults] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);


    const tab = searchParams.get("tab") ?? "all";
    const [tabValue, setTabValue] = useState(tab);
    useEffect(() => {
        setTabValue(tab);
    }, [tab]);

    const query = searchParams.get("q") ?? "";
    const [value, setValue] = useState(query);
    useEffect(() => {
        setValue(query);
    }, [query]);


    async function fetchResults(query: string) {
        const encodedQuery = encodeURIComponent(query);
        const encodedType = encodeURIComponent(tabValue);
        const res = await fetch(`/api/search?q=${encodedQuery}&type=${encodedType}`);
        const data = await res.json();
        console.log(data.results);
        return data.results;
    }

    async function getResults(query: string) {
        if (!query || query.trim() === "") {
            return []; // Return an empty array if the query is empty or only contains whitespace
        }

        const lowerCaseQuery = query.toLowerCase();
        const newResults = await fetchResults(lowerCaseQuery);

        return newResults;
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
    }, [value, tabValue]);



    function checkUrl(url: string) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return "https://" + url;
        }
        return url;
    }


    function ImageResultsStack() {
        if (loading == true) {
            return null;
        }
        else {
            return (
                <div className="w-full flex flex-wrap items-start justify-start gap-4">
                    {results.map((result : any, index : number) => (
                        <div key={index} className="p-4 border rounded flex flex-col card flex-[1_1_auto] min-w-[18rem]">
                            <div className="w-full h-52 overflow-hidden rounded bg-slate-50 flex items-center justify-center">
                                <img src={result.image_url} alt={result.alt_text} className="max-w-full h-full w-auto object-contain" />
                            </div>
                            <a href={checkUrl(result.site_url)} className="mt-3 text-sm text-gray-600 break-all" target="_blank" rel="noopener noreferrer">
                                {checkUrl(result.site_url)}
                            </a>
                        </div>
                    ))}
                </div>
            );
        }
    }

    function resultsStack() {
        if (loading == true) {
            return (
                <div className="w-full max-w-3xl flex flex-col items-center justify-center">
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
                <div className="w-full max-w-3xl flex flex-col items-center justify-start">

                    {<WikiFocus />}

                    {results.map((result : any, index : number) => (
                        <a key={index} className="w-full" href={`https://${result.url}`} rel="noopener noreferrer">
                            <div className="w-full mb-4 p-4 border rounded flex flex-col card">
                                <div className="w-full flex flex-row justify-start items-center">
                                    <img src={`https://www.google.com/s2/favicons?domain=${result.url}`} alt="favicon" className="w-4 h-4 mr-2" />
                                    <p className="text-blue-500">{result.title}</p>
                                </div>
                                {result.description && <p className="mt-1">{result.description}</p>}
                                <p className="text-gray-600 text-sm">{checkUrl(result.url)}</p>
                            </div>
                        </a>
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="w-full flex flex-col justify-start">
            { tabValue === "images" ? <ImageResultsStack /> : resultsStack() }
        </div>
    );

}