import SearchPage from "@/components/searchPage/SearchPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Resultat de recherche`, // Adjust title as needed
  };
}

export default function Page({ searchParams }: { searchParams: any }) {
  return (
    <div className="min-h-screen">
      <SearchPage searchParams={searchParams} />
    </div>
  );
}
