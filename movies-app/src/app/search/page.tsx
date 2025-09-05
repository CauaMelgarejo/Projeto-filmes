import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <SearchResults />
    </Suspense>
  );
}