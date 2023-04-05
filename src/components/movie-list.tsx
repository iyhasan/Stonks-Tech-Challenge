// Not generic - should only be used by search component due to 
// weird styling
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
        <SimpleGrid columns={1} position='absolute' w='100%' background="white" maxHeight="500px" overflowY="scroll">
          {movieList.map((result, index) => {

            const bookmarkIconColor = !!intersectionMovies.find((mov) => mov.imdbID == result.imdbID) ? 'yellow.400' : 'gray'

            return (
              <Box 
                key={index} 
                p={2} 
                borderWidth={1} 
                borderRadius={0} 
                _hover={{
                  backgroundColor: 'gray.800',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => routeToMoviePage(result.imdbID)}>
                <Flex flexDirection="row">
                  <Image src={result.Poster} alt={'Img missing'} height='80px' width='80px'/>
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