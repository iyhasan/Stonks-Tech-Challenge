import { Movie } from "./rapidapi-movies";

export interface BookmarkedMovie {
    movie: Movie,
    imdbID: string,
    rating: number,
    review: string,
    isWatched: boolean,
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface FullMovieProfile {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}
  