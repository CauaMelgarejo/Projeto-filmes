"use client";

import { useEffect, useState } from "react";
import StarRating from "@/components/StarRating";
import "./index.scss";
import Loading from "@/components/Loading";

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  job: string;
  name: string;
}

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
}

interface MovieDetailProps {
  id: string;
}

export default function MovieDetail({ id }: MovieDetailProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (!movie) return <p>Filme não encontrado.</p>;

  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="overlay"></div>
      <div className="movie-container">
        <div className="poster">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="no-poster">Sem imagem</div>
          )}
        </div>

        <div className="info">
          <h1>{movie.title}</h1>

          {movie.vote_average != null && movie.vote_average > 0 && (
            <div className="rating">
              <StarRating rating={movie.vote_average} />
              <span>{Math.round(movie.vote_average / 2)}/5</span>
            </div>
          )}


          <p className="director">
            <strong>Diretor:</strong> {director?.name || "Desconhecido"}
          </p>


          <p className="overview">{movie.overview || "Sem sinopse."}</p>

          <div className="cast">
            <strong>Elenco:</strong>
            <div className="cast-list">
              {cast.length > 0 ? (
                cast.map((actor) => (
                  <div key={actor.id} className="actor">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                      />
                    ) : (
                      <div className="no-image">?</div>
                    )}
                    <span>{actor.name}</span>
                  </div>
                ))
              ) : (
                <p>Sem informações de elenco.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
