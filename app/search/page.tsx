import { Suspense } from "react";
import SearchBar from "../../components/searchBar/page";
import ResultLabel from "../../components/results/page";
import ResultList from "../../components/resultsList/page";
import TabBar from "../../components/tab_bar/page";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mb-4 w-full">
            <Suspense fallback={<div>Loading search params...</div>}>
              <SearchBar />
            </Suspense>
        </div>

        <div className="w-full mb-4">
            <Suspense fallback={<div>Loading tabs...</div>}>
              <TabBar />
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
