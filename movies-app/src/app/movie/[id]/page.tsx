import MovieDetail from "@/components/MovieDetails";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params; // aqui resolvemos a Promise
  return <MovieDetail id={id} />;
}