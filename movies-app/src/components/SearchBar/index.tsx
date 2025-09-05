"use client";
import { useState } from "react";
import "./index.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // dispara função de busca externa
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Pesquisar filmes..."
      value={query}
      onChange={handleChange}
    />
  );
}
