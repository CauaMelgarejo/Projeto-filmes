"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import MovieList from "@/components/MovieList";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}&language=pt-BR`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (!query) return <p>Digite algo para buscar.</p>;
  if (loading) return <p>Carregando...</p>;
  if (results.length === 0) return <p>Nenhum resultado encontrado.</p>;

  return <MovieList movies={results} />;
}