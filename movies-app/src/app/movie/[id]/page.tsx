import MovieDetail from "@/components/MovieDetails";

type Props = {
  params: {
    id: string;
  };
};

export default function Details({ params }: Props) {
  return (
    <div>
      <MovieDetail id={params.id} />
    </div>
  );
}