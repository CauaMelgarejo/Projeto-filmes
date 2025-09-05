"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";

interface MovieListProps {
  movies?: Movie[]; // se vier, usa; se não vier, faz fetch
}

export default function MovieList({ movies }: MovieListProps) {
  const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // Busca filmes da API
  const fetchMovies = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            page: pageNumber,
          },
        }
      );

      setFetchedMovies((prev) => [...prev, ...response.data.results]);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Busca inicial ou quando a página mudar
  useEffect(() => {
    if (!movies) {
      fetchMovies(page);
    }
  }, [movies, page]);

  // Detecta scroll perto do fim da página
  useEffect(() => {
    if (movies) return; // não aplica infinite scroll nos favoritos

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        (totalPages === null || page < totalPages)
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages, movies]);

  // usa movies recebidos por props OU os buscados via API
  const data = movies ?? fetchedMovies;

  if (!data || data.length === 0) {
    return <p>Nenhum filme encontrado.</p>;
  }

  return (
    <>
      <ul className="movie-list">
        {data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}
    </>
  );
}
