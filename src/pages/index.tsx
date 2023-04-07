import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
  Flex, Text, Box
} from '@chakra-ui/react';
import { COLOR_SCHEMES } from '@/helpers/constants';
import { bookmarkStore } from '@/lib/store';
import MovieCardCarousel from '@/components/movie-carousel';
import { BookmarkedMovie } from '@/types';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [latestBookmarked, setLatestBookmarked] = useState<BookmarkedMovie[]>([]);
  const [randomUnWatchedMovies, setRandomUnWatchedMovies] = useState<BookmarkedMovie[]>([]);

  useEffect(() => {
    // Get movieList from the store on the client-side
    const clientMovieList = bookmarkStore.getState().movies.slice(0,6);
    setLatestBookmarked(clientMovieList);

    // Subscribe to store updates
    const unsubscribe = bookmarkStore.subscribe((store) => {
      setLatestBookmarked(store.movies.slice(0,6));
    });

    // Clean up the subscription when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unwatchedMovies = (
              bookmarkStore.getState().movies
              .filter((mov) => !mov.isWatched) // remove watched movies
              .sort(() => 0.5 - Math.random()) // randomly sort list
              .slice(0,6)); // take first 6 movies from sorted list

    setRandomUnWatchedMovies(unwatchedMovies)
  }, []);

  return (
    <Flex w={'100%'} align='center' justify='center' color={COLOR_SCHEMES.fontMain} direction="column" mb={20} px={10}>
      <Box width="100%">
        <Text fontSize="2xl" mb={10}> Latest Bookmarked</Text>
        <MovieCardCarousel movieList={latestBookmarked} emptyMessage="No Movies Bookmarked" />
      </Box>
      <Box width="100%">
        <Text fontSize="2xl" mb={10}>Unwatched Movies</Text>
        <MovieCardCarousel movieList={randomUnWatchedMovies} emptyMessage="No Unwatched Movies In Bookmark" />
      </Box>
    </Flex>
  )
}
