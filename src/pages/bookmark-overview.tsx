import React, { useState, useEffect } from 'react';
import MovieList from "@/components/movie-list";
import { bookmarkStore } from "@/lib/store"
import { BookmarkedMovie } from "@/types"
import { Movie } from "@/types/rapidapi-movies";
import { Box } from '@chakra-ui/react';

function BookmarkOverview() {

    const [movieList, setMovieList] = useState<BookmarkedMovie[]>([]);

    useEffect(() => {
    // Get movieList from the store on the client-side
    const clientMovieList = bookmarkStore.getState().movies;
    setMovieList(clientMovieList);

    // Subscribe to store updates
    const unsubscribe = bookmarkStore.subscribe((store) => {
      setMovieList(store.movies);
    });

    // Clean up the subscription when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

    return (
        <Box>
            {
                movieList.map((mov: BookmarkedMovie) => (
                    <Box>{mov.movie.Title}</Box>
                ))
            }
        </Box>
    )
}

export default BookmarkOverview