import { Suspense } from "react";
import SearchBar from "../../components/searchBar/page";
import ResultLabel from "../../components/results/page";
import ResultList from "../../components/results/page";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="mb-4 w-full">
            <Suspense fallback={<div>Loading search params...</div>}>
              <SearchBar />
            </Suspense>
        </div>

        <Suspense fallback={<div>Loading search parameters...</div>}>
          <ResultLabel />
        </Suspense>

        <Suspense fallback={<div>Loading search results...</div>}>
          <ResultList />
        </Suspense>

      </main>
    </div>
  );
}
