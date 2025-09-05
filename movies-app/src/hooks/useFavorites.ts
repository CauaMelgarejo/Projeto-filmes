// src/hooks/useFavorites.ts
'use client'; // Hooks que interagem com localStorage precisam ser client components

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie'; // Importe seu tipo Movie

export const useFavorites = () => {
  // Estado para guardar a lista de filmes favoritos
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // useEffect para carregar os favoritos do localStorage quando o componente montar
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteMovies');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavorites([]); // Em caso de erro, começa com a lista vazia
    }
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Função para salvar os favoritos no estado e no localStorage
  const saveFavorites = (movies: Movie[]) => {
    setFavorites(movies);
    localStorage.setItem('favoriteMovies', JSON.stringify(movies));
  };

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (movieId: number) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    saveFavorites(newFavorites);
  };
  
  // Função para checar se um filme já é favorito
  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};