export interface Movie {
  id:number;
  title:string,
  poster_path:string,
  overview:string,
  vote_average:number,
}
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  job: string;
  name: string;
}

export interface MovieDetails {
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
