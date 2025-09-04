import MovieDetail from "@/components/MovieDetails";

interface PageProps {
  params: { id: string };
}

export default async function Details({ params }: PageProps) {
  return (
    <div>
      <MovieDetail id={params.id} />
    </div>
  );
}
