// src/app/favorites/page.tsx
"use client";

import MovieList from "@/components/MovieList";
import { useFavorites } from "@/hooks/useFavorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return <p>Nenhum favorito ainda.</p>;
  }

  return <MovieList movies={favorites} />;
}