import React, { useState, useEffect } from 'react';
import MovieList from "@/components/movie-list";
import { bookmarkStore } from "@/lib/store"
import { BookmarkedMovie } from "@/types"
import { Movie } from "@/types/rapidapi-movies";
import { Box, Text, Flex, Image, Center, VStack, IconButton, Spacer } from '@chakra-ui/react';
import { PLACEHOLDER_MOVIE_POSTER } from '@/helpers/constants';
import { useRouter } from 'next/router';
import { AddIcon, CloseIcon, ViewIcon } from '@chakra-ui/icons';
import WatchedRatingSlider from '@/components/watched-rating-slider';

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
      <Box backgroundColor="gray.700" width="100%">
        <Flex wrap="wrap" justifyContent="center">
          {movieList.map((bookmarkedMovie: BookmarkedMovie) => (
            <Flex
              key={bookmarkedMovie.imdbID}
              borderWidth={1}
              borderRadius={5}
              m={3}
              p={3}
              width="300px"
              onClick={() => {
                routeToMoviePage(bookmarkedMovie.imdbID)
              }}
              cursor="pointer"
              color="white"
              _hover={{
                backgroundColor: "gray.100",
                color: "black"
              }}
              direction="column"
            >

              <div>
                <IconButton 
                    aria-label="Bookmark Movie"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBookmark(bookmarkedMovie.imdbID);
                    }}
                    icon={<CloseIcon />}
                    _hover={{
                      backgroundColor: 'red',
                      color: 'white'
                    }} 
                    borderWidth={0}
                    position="absolute"
                  />
              </div>
              <Center>
              <Image
                src={bookmarkedMovie.movie.Poster !== 'N/A' ? bookmarkedMovie.movie.Poster : PLACEHOLDER_MOVIE_POSTER}
                alt={bookmarkedMovie.movie.Title}
                borderRadius={5}
                mb={3}
                width="100%"
                height="200px"
                objectFit="cover"
              />
              </Center>
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="bold">
                  {bookmarkedMovie.movie.Title}
                </Text>
                <Text>{bookmarkedMovie.movie.Year}</Text>
              </Box>
              <Spacer/>
              <Box width="100%">
                  <WatchedRatingSlider imdbID={bookmarkedMovie.imdbID}/>  
              </Box>

            </Flex>
          ))}
        </Flex>
      </Box>
    )
}

export default BookmarkOverview