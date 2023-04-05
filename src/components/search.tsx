import React, { useState, useRef } from 'react';
import {
  Box,
  Input,
  Button,
  Flex,
  useOutsideClick,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { Movie } from '@/types/rapidapi-movies';
import MovieList from './movie-list';
import { bookmarkStore } from '@/lib/store';
import { BookmarkedMovie } from '@/types';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Movie[]>([]);

  const ref = useRef();

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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchMovies = async () => {
    // Replace the URL below with the actual API endpoint URL
    const response = await fetch(`/api/search?s=${searchTerm}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setResults([...data.Search])
    } else {
      setResults([])
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <Box w={'50%'} backgroundColor='white'>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center" direction="row">
          <Input
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={handleChange}
            borderRadius={0}
          />
          <Button type="submit" borderRadius="0">
            <SearchIcon />
          </Button>
        </Flex>
      </form>
      <div style={{position: 'relative'}} ref={ref}>
        <MovieList movieList={results} onClick={toggleMovieBookmark}/>
      </div>
    </Box>
  );
};

export default Search;
