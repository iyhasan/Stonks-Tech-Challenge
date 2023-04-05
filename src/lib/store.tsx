import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { BookmarkSlice } from './slice'
import {BookmarkedMovie} from "../types/index"


export const bookmarkStore = create<BookmarkSlice>()(
    persist(
        (set, get) => ({
            movies: [],
            fetchById: (imdbID: string) => {
                return get().movies.find((mov: BookmarkedMovie) => mov.imdbID === imdbID)
            },
            removeMovie: (imdbID: string) => {
                set((state) => (
                    {
                        movies: state.movies.filter((mov: BookmarkedMovie) => mov.imdbID !== imdbID)
                    }
                ))
            },
            addMovie: (newMov: BookmarkedMovie) => {
                set((state) => {
                    
                const existingMov = state.movies.find((mov: BookmarkedMovie) => mov.imdbID === newMov.imdbID)
                if (existingMov) return state; // skip if movie is already bookmarked
                
                return (
                    {
                        ...state,
                        movies: [newMov ,...state.movies]
                    }
                )})
            },
            updateMovie: (imdbID: string, updatedMov: BookmarkedMovie) => {
                set((state) => 
                    {
                        const newMovies = state.movies.map((mov) => {
                            if (mov.imdbID !== imdbID) return mov;
                            return updatedMov
                        });

                        return {
                            movies: newMovies
                        };


                    }
                )
            }
        }),
        {
            name: 'bookmark-storage'
        }

    )
)