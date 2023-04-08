import React, { useEffect, useState } from 'react';
import { bookmarkStore } from "@/lib/store";
import { BookmarkedMovie } from "@/types";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { 
    Box, 
    Slide, 
    VStack, 
    Button, 
    Text, 
    Flex, 
    IconButton, 
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea
} from "@chakra-ui/react";
import { COLOR_SCHEMES } from '@/helpers/constants';

interface ReviewMovieModal {
    movie: BookmarkedMovie,
    isOpen: any,
    onOpen: any,
    onClose: any,
}

function ReviewModal ({ movie, isOpen, onOpen, onClose }: ReviewMovieModal) {

    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        // set reviewText to the value of review
        setReviewText(movie.review);
    }, []);

    const updateReview = () => {
        bookmarkStore.getState().updateMovie(
            movie.imdbID,
            {
                ...movie,
                review: reviewText,
            }
            )
        onClose();
    }
    
    return (
        <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent
        backgroundColor={COLOR_SCHEMES.main} 
        color={COLOR_SCHEMES.fontMain} 
        borderColor={COLOR_SCHEMES.yellow} 
        borderWidth={1}
        borderRadius={5}
        >
          <ModalBody>
            <Flex flexDirection="column">
              <Text mr={3} as="b" my={4}>My Review:</Text>
              <Textarea
                borderColor={COLOR_SCHEMES.main}
                _hover={{
                    borderColor: COLOR_SCHEMES.main
                }}
                focusBorderColor={COLOR_SCHEMES.third}
                placeholder="Write your review here..."
                onChange={(e) => setReviewText(e.target.value)}
                // onBlur={}
              />
            </Flex>
            <Flex my={5}>
                <Box
                borderRadius={5}
                px={3}
                py={2}
                borderWidth={1}
                borderColor={COLOR_SCHEMES.third}
                cursor="pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    onClose();
                }}
                >
                    Close
                </Box>
                <Box 
                ml={5}
                backgroundColor={COLOR_SCHEMES.yellow}
                color={COLOR_SCHEMES.main}
                borderRadius={5}
                px={3}
                py={2}
                cursor="pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    updateReview();
                }}
                >
                    Save
                </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )

}


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
    openModal: any
}


function RatingSlider ({imdbID, bookmarkedInfo, selectedColor, selectedBackgroundColor, hoveringColor, hoveringBackgroundColor, baseColor, baseBackgroundColor, openModal}: RatingSliderProps) {

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

        if (bookmarkedInfo.review.length == 0) openModal();
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
                borderRightRadius={i == 4 ? 5 : 0}
            >
                <StarIcon />
            </Center>
        )
        }

        return stars;
    }

    return (
        <Flex borderWidth={1} borderLeft={1} borderRightRadius={5} borderColor={COLOR_SCHEMES.yellow}>
        {renderStars()}
        </Flex>
    );
}

function WatchedRatingSlider ({imdbID, baseColor, baseBackgroundColor, hoveringColor, hoveringBackgroundColor, selectedColor, selectedBackgroundColor} : WatchedRatingSlider) {
    const [showSlider, setShowSlider] = useState(false);
    const bookmarkedMovie: BookmarkedMovie | undefined = bookmarkStore((state) => state.fetchById(imdbID));
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!bookmarkedMovie) return null;

    const isWatched = bookmarkedMovie.isWatched;
    const rating = bookmarkedMovie.rating;

    const BASECOLOR = baseColor ? baseColor : COLOR_SCHEMES.gray;
    const BASEBACKGROUNDCOLOR = baseBackgroundColor ? baseBackgroundColor : COLOR_SCHEMES.main;
    const SELECTEDCOLOR = selectedColor ? selectedColor : 'yellow.400';
    const SELECTEDBACKGROUNDCOLOR = selectedBackgroundColor ? selectedBackgroundColor : COLOR_SCHEMES.main;
    const HOVERINGCOLOR = hoveringColor ? hoveringColor : 'gray.400';
    const HOVERINGBACKGROUNDCOLOR = hoveringBackgroundColor ? hoveringBackgroundColor : 'gray.100';

    const toggleIsWatched = () => {

        const shouldOpenModal = !bookmarkedMovie.isWatched && bookmarkedMovie.review.length == 0;

        bookmarkStore.getState().updateMovie(
        imdbID,
        {
            ...bookmarkedMovie,
            isWatched: !bookmarkedMovie.isWatched,
        }
        )

        if (shouldOpenModal) onOpen();
        
    }

    return (
        <Flex onMouseEnter={() => setShowSlider(true)} onMouseLeave={() => setShowSlider(false)}>
            <ReviewModal movie={bookmarkedMovie} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
          <Center 
            _hover={{
                backgroundColor: HOVERINGBACKGROUNDCOLOR,
                color: bookmarkedMovie.isWatched ? SELECTEDCOLOR : HOVERINGCOLOR
            }}
            onClick={(e) => {
                e.stopPropagation();
                toggleIsWatched();
            }}
            backgroundColor={bookmarkedMovie.isWatched ? SELECTEDBACKGROUNDCOLOR : BASEBACKGROUNDCOLOR}
            color={bookmarkedMovie.isWatched ? SELECTEDCOLOR : BASECOLOR}
            px={3}
            borderWidth={1}
            borderColor={COLOR_SCHEMES.yellow}
            py={2}
            borderLeftRadius={5}
            borderRightRadius={showSlider || bookmarkedMovie.rating ? 0 : 5}
            >
                <ViewIcon 
            />
          </Center>
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
                        openModal={onOpen}
                    />
                ) : bookmarkedMovie.rating ? (
                    <Center 
                        px={2} 
                        borderWidth={1} 
                        borderLeft={1} 
                        onClick={(e) => e.stopPropagation()}
                        backgroundColor={SELECTEDBACKGROUNDCOLOR}
                        color={SELECTEDCOLOR} 
                        borderRightRadius={5}
                        borderColor={COLOR_SCHEMES.yellow}
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