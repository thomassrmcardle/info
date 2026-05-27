"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabBar() {

    const tabs = [
        { label: "All", value: "all" },
        { label: "Images", value: "images" },
    ];

    const router = useRouter();

    const searchParams = useSearchParams();

    const query = searchParams.get("q") ?? "";
    const [value, setValue] = useState(query);
    useEffect(() => {
        setValue(query);
    }, [query]);

    const tab = searchParams.get("tab") ?? "all";
    const [tabValue, setTabValue] = useState(tab);
    useEffect(() => {
        setTabValue(tab);
    }, [tab]);

    function handleTabChange(newTab: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", newTab);
        router.push(`/search?${params.toString()}`);
    }

    return (
        <div className="w-full flex flex-row items-center gap-4">
            {tabs.map((t) => (
                <button
                    key={t.value}
                    className={`px-4 py-2 rounded ${tabValue === t.value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => handleTabChange(t.value)}
                >   {t.label}</button>
            ))}
        </div>
    );
            

}