import React, { useState } from 'react';
import { bookmarkStore } from "@/lib/store";
import { BookmarkedMovie } from "@/types";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Slide, VStack, Button, Text, Flex, IconButton, Center} from "@chakra-ui/react";

interface WatchedRatingSlider {
    imdbID: string,
    selectedBackgroundColor: string | undefined | null,
    selectedColor: string | undefined | null,
    hoveringBackgroundColor: string | undefined | null,
    hoveringColor: string | undefined | null,
    baseBackgroundColor: string | undefined | null,
    baseColor: string | undefined | null,
}

interface RatingSliderProps {
    imdbID: string;
    bookmarkedInfo: BookmarkedMovie,
    selectedBackgroundColor: string,
    selectedColor: string,
    hoveringBackgroundColor: string,
    hoveringColor: string,
    baseBackgroundColor: string,
    baseColor: string,
}

function RatingSlider ({imdbID, bookmarkedInfo, selectedColor, selectedBackgroundColor, hoveringColor, hoveringBackgroundColor, baseColor, baseBackgroundColor}: RatingSliderProps) {

    const rating = bookmarkedInfo.rating;

    const updateRating = (newRating: number) => {
        bookmarkStore.getState().updateMovie(
        imdbID,
        {
            ...bookmarkedInfo,
            rating: newRating,
            isWatched: true,
        }
        )
    }

    const renderStars = () => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
        stars.push(
            <Center 
                key={`star_${i}`}
                backgroundColor={i < rating ? selectedBackgroundColor : baseBackgroundColor}
                color={i < rating ? selectedColor : baseColor}
                onClick={(e) => {
                    e.stopPropagation();
                    updateRating(i+1);
                }}
                aria-label={`Rate ${i+1}`}
                _hover={{
                    backgroundColor: hoveringBackgroundColor,
                    color: i < rating ? selectedColor : hoveringColor
                }}
                px={3}
                textAlign="center"
            >
                <StarIcon />
            </Center>
        )
        }

        return stars;
    }

    return (
        <Flex borderWidth={1} borderLeft={1} borderRadius={0}>
        {renderStars()}
        </Flex>
    );
}

function WatchedRatingSlider ({imdbID, baseColor, baseBackgroundColor, hoveringColor, hoveringBackgroundColor, selectedColor, selectedBackgroundColor} : WatchedRatingSlider) {
    const [showSlider, setShowSlider] = useState(false);
    const bookmarkedMovie: BookmarkedMovie | undefined = bookmarkStore((state) => state.fetchById(imdbID));

    if (!bookmarkedMovie) return null;

    const isWatched = bookmarkedMovie.isWatched;
    const rating = bookmarkedMovie.rating;

    const BASECOLOR = baseColor ? baseColor : 'gray.400';
    const BASEBACKGROUNDCOLOR = baseBackgroundColor ? baseBackgroundColor : 'gray.700';
    const SELECTEDCOLOR = selectedColor ? selectedColor : 'yellow.400';
    const SELECTEDBACKGROUNDCOLOR = selectedBackgroundColor ? selectedBackgroundColor : 'gray.700';
    const HOVERINGCOLOR = hoveringColor ? hoveringColor : 'gray.400';
    const HOVERINGBACKGROUNDCOLOR = hoveringBackgroundColor ? hoveringBackgroundColor : 'gray.100';

    const toggleIsWatched = () => {
        bookmarkStore.getState().updateMovie(
        imdbID,
        {
            ...bookmarkedMovie,
            isWatched: !bookmarkedMovie.isWatched,
        }
        )
    }

    return (
        <Flex onMouseEnter={() => setShowSlider(true)} onMouseLeave={() => setShowSlider(false)}>
          <Button 
            _hover={{
                backgroundColor: HOVERINGBACKGROUNDCOLOR,
                color: bookmarkedMovie.isWatched ? SELECTEDCOLOR : HOVERINGCOLOR
            }}
            variant="outline" 
            borderRadius={0}
            onClick={(e) => {
                e.stopPropagation();
                toggleIsWatched();
            }}
            backgroundColor={bookmarkedMovie.isWatched ? SELECTEDBACKGROUNDCOLOR : BASEBACKGROUNDCOLOR}
            color={bookmarkedMovie.isWatched ? SELECTEDCOLOR : BASECOLOR}
            px={2}
            >
            <ViewIcon 
            />
          </Button>
          <>
            {
                showSlider ? (
                    <RatingSlider 
                        imdbID={imdbID} 
                        bookmarkedInfo={bookmarkedMovie}
                        baseColor={BASECOLOR}
                        baseBackgroundColor={BASEBACKGROUNDCOLOR}
                        hoveringColor={HOVERINGCOLOR}
                        hoveringBackgroundColor={HOVERINGBACKGROUNDCOLOR}
                        selectedColor={SELECTEDCOLOR}
                        selectedBackgroundColor={SELECTEDBACKGROUNDCOLOR}
                    />
                ) : bookmarkedMovie.rating ? (
                    <Center 
                        px={2} 
                        borderWidth={1} 
                        borderLeft={1} 
                        onClick={(e) => e.stopPropagation()}
                        backgroundColor={SELECTEDBACKGROUNDCOLOR}
                        color={SELECTEDCOLOR} 
                        >
                        <StarIcon mr={1}/>
                        <Text fontSize="md" as="b">{bookmarkedMovie.rating}</Text>
                    </Center>
                ) : null
            }
          </>
        </Flex>
      );


}

export default WatchedRatingSlider;