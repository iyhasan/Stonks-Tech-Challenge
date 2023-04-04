import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { Movie } from '@/types/rapidapi-movies';
import MovieList from './movie-list';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchMovies = async () => {
    setLoading(true);
    // Replace the URL below with the actual API endpoint URL
    const response = await fetch(`/api/search?s=${searchTerm}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setResults([...data.Search])
    } else {
      setResults([])
    }
    setLoading(false);
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
      <div style={{position: 'relative'}}>
        <MovieList movieList={results} />
      </div>
    </Box>
  );
};

export default Search;
