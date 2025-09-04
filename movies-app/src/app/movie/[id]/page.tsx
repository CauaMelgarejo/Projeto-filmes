import MovieDetail from "@/components/MovieDetails";
import { Metadata } from "next";

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Details({ params }: PageProps) {
  return (
    <div>
      <MovieDetail id={params.id} />
    </div>
  );
}