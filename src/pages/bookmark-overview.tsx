import React, { useState, useEffect } from 'react';
import MovieList from "@/components/movie-list";
import { bookmarkStore } from "@/lib/store"
import { BookmarkedMovie } from "@/types"
import { Movie } from "@/types/rapidapi-movies";

function BookmarkOverview() {

    const movieList = bookmarkStore((state) => state.movies);

    return (
        <div>
            {
                movieList.map((mov: BookmarkedMovie) => (
                    <p>{mov.movie.Title}</p>
                ))
            }
        </div>
    )
}

export default BookmarkOverview