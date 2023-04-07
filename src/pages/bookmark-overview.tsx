import React, { useState, useEffect } from 'react';
import { bookmarkStore } from "@/lib/store"
import { BookmarkedMovie } from "@/types"
import { Box, Flex } from '@chakra-ui/react';
import { COLOR_SCHEMES } from '@/helpers/constants';
import { useRouter } from 'next/router';
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
        <Flex wrap="wrap" justifyContent="center" mx="auto">
          {movieList.map((bookmarkedMovie: BookmarkedMovie) => (
            <Box 
            key={`bookmark_overview_${bookmarkedMovie.imdbID}`}
            m={2} 
            backgroundColor={COLOR_SCHEMES.secondary}
            width="300px" 
            minHeight="480px"
            borderWidth={3} 
            borderColor={COLOR_SCHEMES.third}
            borderRadius={20}
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