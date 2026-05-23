import { Suspense } from "react";
import SearchBar from "../components/searchBar/page";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <h1 className="w-full lg-txt mb-8 text-center">Info.</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
        </Suspense>

      </main>
    </div>
  );
}
