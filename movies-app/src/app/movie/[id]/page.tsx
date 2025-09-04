import MovieDetail from "@/components/MovieDetails";

export default async function Details({ params }: any) {
  return (
    <div>
      <MovieDetail id={params.id} />
    </div>
  );
}