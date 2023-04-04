import { Movie } from "@/types/rapidapi-movies"
import {
    Box,
    Text,
    SimpleGrid,
    Image,
    Flex,
  } from '@chakra-ui/react';

interface MovieListProps {
    movieList: Movie[]
}

function MovieList({ movieList }: MovieListProps) {

    if (movieList.length === 0) {
        return null
    }

    return (
        <SimpleGrid columns={1} position='absolute' w='100%' background="white" maxHeight="500px" overflowY="scroll">
          {movieList.map((result, index) => (
            <Box key={index} p={2} borderWidth={1} borderRadius={0}>
              <Flex flexDirection="row">
                <Image src={result.Poster} alt={'Img missing'} height='80px' width='80px'/>
                <Box ml={3}>
                  <Text fontWeight="bold">{result.Title}</Text>
                  <Text>Year: {result.Year}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
    )

}

export default MovieList