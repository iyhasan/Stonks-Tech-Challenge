import { StateCreator } from "zustand";
import {BookmarkedMovie} from "../types/index"

export interface BookmarkSlice {

    movies: BookmarkedMovie[],
    fetchById: (imdbID: string) => BookmarkedMovie | undefined,
    removeMovie: (imdbID: string) => void,
    addMovie: (movie: BookmarkedMovie) => void   

}