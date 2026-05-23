import SearchBar from "../../components/searchBar/page";

interface SearchPageProps {
  searchParams: { q?: string };
} 

export default function Home({ searchParams }: SearchPageProps) {



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="mb-8 w-full">
            <SearchBar searchQuery={searchParams.q} />
        </div>
        <p>Showing results for "{searchParams.q}"</p>

      </main>
    </div>
  );
}
