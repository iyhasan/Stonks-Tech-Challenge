import { Movie } from "./rapidapi-movies";

export interface BookmarkedMovie {
    movie: Movie,
    imdbID: string,
    rating: number,
    review: string,
    isWatched: boolean,
}