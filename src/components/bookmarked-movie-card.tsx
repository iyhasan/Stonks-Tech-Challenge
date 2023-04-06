import React, { useState } from 'react';
import { bookmarkStore } from "@/lib/store";
import { BookmarkedMovie } from "@/types";
import { CloseIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Slide, VStack, Button, Text, Flex, IconButton, Center, Card, CardHeader, CardBody, CardFooter, Image} from "@chakra-ui/react";
import WatchedRatingSlider from './watched-rating-slider';
import { COLOR_SCHEMES, PLACEHOLDER_MOVIE_POSTER } from '@/helpers/constants';
import { useRouter } from 'next/router';

interface BookmarkedMovieCardProps {
    movie: BookmarkedMovie
}

const removeBookmark = (imdbID: string) => {
    bookmarkStore.getState().removeMovie(imdbID)
}

function BookmarkedMovieCard ({ movie }: BookmarkedMovieCardProps) {

  const router = useRouter();

  const routeToMoviePage = () => {
    router.push(`/movie/${movie.imdbID}`)
  }
  

    return (
        <Card 
        p="10px"
        backgroundColor="none" 
        height="100%"
        position="relative"
        overflow="hidden"
        >
            {/* <Image src="/film-reel.png" position="absolute" ml="50%" mt="30px"/> */}
            <CardHeader p={0}>
                <Flex 
                  >
                        <CloseIcon
                        mt="10px" 
                        mb="20px" 
                        mx="10px"
                        _hover={{
                            color: 'red'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            removeBookmark(movie.imdbID);
                          }}
                        cursor="pointer"
                        color={COLOR_SCHEMES.yellow}
                        />
                  </Flex>
            </CardHeader>
            <CardBody p={0}>
            <Center>
                <Image
                    src={movie.movie.Poster !== 'N/A' ? movie.movie.Poster : PLACEHOLDER_MOVIE_POSTER}
                    alt={movie.movie.Title}
                    borderRadius={5}
                    width="100%"
                    height="290px"
                    objectFit="contain"
                />
            </Center>
                <Box color={COLOR_SCHEMES.fontMain}>
                    <Text fontSize="24px" as="b" noOfLines={[1]}>{movie.movie.Title}</Text>
                    <Text fontSize="16px">{movie.movie.Year}</Text>
                </Box>
            </CardBody>
            <CardFooter>
                <WatchedRatingSlider imdbID={movie.imdbID} />
            </CardFooter>
        </Card>
    )
}

export default BookmarkedMovieCard;