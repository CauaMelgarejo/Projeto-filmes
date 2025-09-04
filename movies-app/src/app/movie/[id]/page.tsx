import MovieDetail from "@/components/MovieDetails";

export default async function Details({ params }: { params: { id: string } }) {
  // Se precisar buscar dados do servidor, pode usar await aqui
  return (
    <div>
      <MovieDetail id={params.id} />
    </div>
  );
}