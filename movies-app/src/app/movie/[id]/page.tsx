import MovieDetail from "@/components/MovieDetails";

type PageProps = {
  params: {
    id: string;
  };
};

export default function MoviePage({ params }: PageProps) {
  return <MovieDetail id={params.id} />;
}
