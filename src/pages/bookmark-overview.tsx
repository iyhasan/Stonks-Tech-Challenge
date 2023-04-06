import React, { useState, useEffect } from 'react';
import MovieList from "@/components/movie-list";
import { bookmarkStore } from "@/lib/store"
import { BookmarkedMovie } from "@/types"
import { Movie } from "@/types/rapidapi-movies";
import { Box, Text, Flex, Image, Center, VStack, IconButton, Spacer } from '@chakra-ui/react';
import { COLOR_SCHEMES, PLACEHOLDER_MOVIE_POSTER } from '@/helpers/constants';
import { useRouter } from 'next/router';
import { AddIcon, CloseIcon, ViewIcon } from '@chakra-ui/icons';
import WatchedRatingSlider from '@/components/watched-rating-slider';
import BookmarkedMovieCard from '@/components/bookmarked-movie-card';

function BookmarkOverview() {

    const [movieList, setMovieList] = useState<BookmarkedMovie[]>([]);
    const router = useRouter();

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

  const routeToMoviePage = (imdbID: string) => {
    router.push(`/movie/${imdbID}`)
  }

  const removeBookmark = (imdbID: string) => {
    bookmarkStore.getState().removeMovie(imdbID)
  }

  const toggleMovieWatched = (bookmarkedInfo: BookmarkedMovie) => {
    if (!bookmarkedInfo) return;

    bookmarkStore.getState().updateMovie(bookmarkedInfo.imdbID, {
      ...bookmarkedInfo,
      isWatched: !bookmarkedInfo.isWatched
    })
  }
  

    return (
      <Box backgroundColor={COLOR_SCHEMES.main} width="100%">
        <Flex wrap="wrap" justifyContent="center">
          {movieList.map((bookmarkedMovie: BookmarkedMovie) => (
            <Box 
            m={2} 
            backgroundColor={COLOR_SCHEMES.secondary}
            width="310px" 
            minHeight="480px"
            borderWidth={3} 
            borderColor={COLOR_SCHEMES.third}
            borderRadius={20}
            boxShadow="0px 2px 7px #ffffff"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation()
              routeToMoviePage(bookmarkedMovie.imdbID)
            }}  
            _hover={{
              backgroundColor: COLOR_SCHEMES.third
            }}
            >
              <BookmarkedMovieCard movie={bookmarkedMovie}/>
            </Box>
          ))}
        </Flex>
      </Box>
    )
}

export default BookmarkOverview