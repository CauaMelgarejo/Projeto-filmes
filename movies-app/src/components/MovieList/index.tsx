"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "c5fb768f32b61d107d8da18aef8e183b",
        language: "pt-BR"
      }
    }).then((response) => {
      setMovies(response.data.results);
      console.log(response.data.results);
    });
  };
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard
        key = { movie.id }
        movie={movie}
         />
      ))}
    </ul>
  );
}
