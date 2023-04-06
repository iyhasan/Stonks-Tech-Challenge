import React, { useState, useEffect } from 'react';
import { Box, Text, Link, Center, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { COLOR_SCHEMES } from '@/helpers/constants';
import { BookmarkedMovie } from '@/types';
import BookmarkedMovieCard from './bookmarked-movie-card';
import { useRouter } from 'next/router';

interface MovieCardCarouselProps {
    movieList: BookmarkedMovie[],
    emptyMessage: string
}

const MovieCardCarousel = ({ movieList, emptyMessage }: MovieCardCarouselProps) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const router = useRouter();

    const decrementByOne = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
    
      const incrementByOne = () => {
        if (currentIndex < movieList.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };

    
    const routeToMoviePage = (imdbID: string) => {
        router.push(`/movie/${imdbID}`)
    }
    
    
    if (!movieList.length) {
        return (
            <Center>
                <Text fontSize="2xl">{emptyMessage}</Text>
            </Center>
        )
    }

    const cardsToRender = () => {
        const subMovieList = []

        if (currentIndex == 0) {
            // case for first movie
            subMovieList.push(null);
            subMovieList.push(movieList[0]);
            subMovieList.push(movieList.length > 1 ? movieList[1]: null);
        }
        else if (currentIndex == movieList.length - 1) {
            subMovieList.push(movieList.length > 1 ? movieList[currentIndex-1] : null);
            subMovieList.push(movieList[currentIndex]);
            subMovieList.push(null)
        }
        else {
            subMovieList.push(movieList[currentIndex-1]);
            subMovieList.push(movieList[currentIndex]);
            subMovieList.push(movieList[currentIndex+1]);
        }

        return subMovieList;
    }

    return (
        <Box position="relative" width="100%">
            <Box 
            position="absolute" 
            zIndex={10} 
            top="50%" 
            onClick={(e) => {
                e.stopPropagation();
                decrementByOne();
            }}
            p={3}
            backgroundColor={currentIndex !== 0 ? COLOR_SCHEMES.yellow : COLOR_SCHEMES.third}
            mx={10}
            cursor="pointer"
            >
                <ChevronLeftIcon fontSize="24px" />
            </Box>

            <Box 
            position="absolute" 
            zIndex={10} 
            top="50%" 
            right="0"
            onClick={(e) => {
                e.stopPropagation();
                incrementByOne();
            }}
            p={3}
            backgroundColor={COLOR_SCHEMES.yellow}
            mx={10}
            cursor="pointer"
            >
                <ChevronRightIcon fontSize="24px" />
            </Box>


            <Flex position="relative" width="100%" minHeight="400px" justifyContent="space-around">
                {
                cardsToRender().map((movie, index) => {

                    if (!movie) return (
                        <Box width="300px"></Box>
                    )

                    return (
                        <Box
                        transform={(index - 1) ? `rotateY(${55*(index-1)*-1}deg) scale(0.9) translateX(${-60*(index-1)}%)` : ''}
                        m={2} 
                        backgroundColor={COLOR_SCHEMES.secondary}
                        width="300px" 
                        minHeight="480px"
                        borderWidth={3} 
                        borderColor={COLOR_SCHEMES.third}
                        borderRadius={20}
                        cursor="pointer"
                        zIndex={index == 1 ? 9 : 8}
                        onClick={(e) => {
                        e.stopPropagation()
                            routeToMoviePage(movie.imdbID)
                        }}  
                        _hover={{
                        backgroundColor: COLOR_SCHEMES.third
                        }}
                        >
                            <BookmarkedMovieCard movie={movie} />
                        </Box>
                    )
                })}
            </Flex>
        </Box>
    );
};

export default MovieCardCarousel;
