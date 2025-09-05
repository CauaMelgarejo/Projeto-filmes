"use client";

import './index.scss';
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { favorites } = useFavorites();
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query) return;
    // Redireciona para a página de busca com query
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="link">
        <h1 className="page-title">Filmes</h1>
      </Link>
      <SearchBar onSearch={handleSearch} />
      <Link href="/favorites" className="favorites-link">
        <span className="heart">❤️</span>
        {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
      </Link>
    </nav>
  );
}