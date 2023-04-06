import React, { useState } from 'react';
import { bookmarkStore } from "@/lib/store";
import { BookmarkedMovie } from "@/types";
import { CloseIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Slide, VStack, Button, Text, Flex, IconButton, Center, Card, CardHeader, CardBody, CardFooter, Image} from "@chakra-ui/react";
import WatchedRatingSlider from './watched-rating-slider';
import { COLOR_SCHEMES, PLACEHOLDER_MOVIE_POSTER } from '@/helpers/constants';

interface BookmarkedMovieCardProps {
    movie: BookmarkedMovie
}

const removeBookmark = (imdbID: string) => {
    bookmarkStore.getState().removeMovie(imdbID)
}

function BookmarkedMovieCard ({ movie }: BookmarkedMovieCardProps) {

    return (
        <Card p="10px" backgroundColor="none" height="100%">
            <CardHeader p={0}>
                <Flex 
                  >
                        <CloseIcon
                        mt="10px" 
                        mb="20px" 
                        mx="20px"
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
                    objectFit="cover"
                />
            </Center>
                <Box color={COLOR_SCHEMES.fontMain}>
                    <Text fontSize="24px" as="b">{movie.movie.Title}</Text>
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

{/* <Flex
              key={bookmarkedMovie.imdbID}
              borderWidth={1}
              borderRadius={5}
              m={3}
              p={3}
              
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

            </Flex> */}