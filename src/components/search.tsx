import React, { useState, useRef } from 'react';
import {
  Box,
  Input,
  Button,
  Flex,
  useOutsideClick,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { Movie } from '@/types/rapidapi-movies';
import MovieList from './movie-list';
import { bookmarkStore } from '@/lib/store';
import { BookmarkedMovie } from '@/types';
import { useRouter } from 'next/router';
import { COLOR_SCHEMES } from '@/helpers/constants';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Movie[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toast = useToast()

  useOutsideClick({
    ref: ref,
    handler: () => setResults([]),
  })



  const toggleMovieBookmark = (mov: Movie) => {
    const bookmarkMovie: BookmarkedMovie = {
      movie: mov,
      imdbID: mov.imdbID,
      rating: 0,
      review: '',
      isWatched: false
    }

    if (bookmarkStore.getState().fetchById(mov.imdbID)) {
      bookmarkStore.getState().removeMovie(mov.imdbID);
    } else {
      bookmarkStore.getState().addMovie(bookmarkMovie);
    }
  }

  const routeToMoviePage = (imdbID: string) => {
    setResults([])
    router.push(`/movie/${imdbID}`)
  }

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchMovies = async () => {
    // Replace the URL below with the actual API endpoint URL
    const response = await fetch(`/api/search?s=${searchTerm}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setResults([...data.Search])
    } else {
      toast({
        title: 'Error fetching movies',
        description: data.Error,
        status: "error",
        duration: 5000,
        isClosable: true
      })
      setResults([])
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <Box w={'50%'} backgroundColor={COLOR_SCHEMES.main}>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center" direction="row" borderBottomWidth={1} borderColor={COLOR_SCHEMES.yellow}>
          <Input
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={handleChange}
            borderWidth={0}
            focusBorderColor={COLOR_SCHEMES.main}
            color={COLOR_SCHEMES.white}
            mb={1}
          />
          <Button type="submit" borderRadius="0" backgroundColor={COLOR_SCHEMES.main} color={COLOR_SCHEMES.yellow} _hover={{
            backgroundColor: COLOR_SCHEMES.main
          }}>
            <SearchIcon />
          </Button>
        </Flex>
      </form>
      <div style={{position: 'relative', zIndex: 10}} ref={ref} >
        <MovieList movieList={results} bookmarkAction={toggleMovieBookmark} routeToMoviePage={routeToMoviePage}/>
      </div>
    </Box>
  );
};

export default Search;
