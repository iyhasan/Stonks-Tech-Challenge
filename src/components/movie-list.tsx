// Not generic - built for use with search component
// bad structuring on my part

import { Movie } from "@/types/rapidapi-movies";
import {
    Box,
    Text,
    SimpleGrid,
    Image,
    Flex,
    Center,
    IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { bookmarkStore } from "@/lib/store";
import { COLOR_SCHEMES, PLACEHOLDER_MOVIE_POSTER } from "@/helpers/constants";

interface MovieListProps {
    movieList: Movie[],
    bookmarkAction: (mov: Movie) => void,
    routeToMoviePage: (imdbID: string) => void,
}

function MovieList({ movieList, bookmarkAction, routeToMoviePage }: MovieListProps) {
  
    if (movieList.length === 0) {
        return null
    }

    // keep movies in movieList that are bookmarked
    const intersectionMovies = bookmarkStore(
        (state) => movieList
                    .filter((mov) => state.movies.find((bookmarkedMov) => mov.imdbID === bookmarkedMov.imdbID))
        );

    
    return (
        <SimpleGrid 
        columns={1} 
        position='absolute' 
        w='100%' 
        background="white" 
        maxHeight="500px" 
        overflowY="scroll"
        >
          {movieList.map((result, index) => {

            const bookmarkIconColor = !!intersectionMovies.find((mov) => mov.imdbID == result.imdbID) ? 'yellow.400' : 'gray'

            return (
              <Box 
                key={`movie_list_${result.imdbID}`} 
                p={2} 
                borderWidth={1} 
                borderRadius={0} 
                _hover={{
                  backgroundColor: COLOR_SCHEMES.main,
                  color: 'white',
                  cursor: 'pointer',
                  borderColor: COLOR_SCHEMES.main
                }}
                onClick={() => routeToMoviePage(result.imdbID)}>
                <Flex flexDirection="row" alignItems="center">
                  <Image src={result.Poster !== 'N/A' ? result.Poster : PLACEHOLDER_MOVIE_POSTER} alt={'Img missing'} height='80px' width='60px'/>
                  <Box ml={3}>
                    <Text fontWeight="bold">{result.Title}</Text>
                    <Text>Year: {result.Year}</Text>
                  </Box>
                  <Center ml="auto">
                    <IconButton 
                      aria-label="Bookmark Movie"
                      variant="outline"
                      icon={<AddIcon color={bookmarkIconColor}/>}
                      onClick={(e) => {
                        e.stopPropagation();
                        bookmarkAction(result);
                      }}
                      _hover={{
                        backgroundColor: 'gray.100'
                      }} />
                  </Center>
                </Flex>
              </Box>
            )
          })}
        </SimpleGrid>
    )

}

export default MovieList