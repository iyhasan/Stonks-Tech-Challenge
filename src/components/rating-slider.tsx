import { bookmarkStore } from "@/lib/store";
import { BookmarkedMovie } from "@/types";
import { StarIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";

interface RatingSliderProps {
    imdbID: string;
    bookmarkedInfo: BookmarkedMovie
}

export default function RatingSlider ({imdbID, bookmarkedInfo}: RatingSliderProps) {

    const rating = bookmarkedInfo.rating;

    const updateRating = (newRating: number) => {
        bookmarkStore.getState().updateMovie(
        imdbID,
        {
            ...bookmarkedInfo,
            rating: newRating
        }
        )
    }

    const renderStars = () => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
        stars.push(
            <IconButton 
            key={`star_${i}`}
            icon={<StarIcon />}
            backgroundColor="gray.700"
            color={i < rating ? 'yellow.400' : 'gray.400'}
            onClick={(e) => {
                e.stopPropagation();
                updateRating(i+1);
            }}
            aria-label={`Rate ${i+1}`}
            _hover={{
                backgroundColor: 'gray.100'
            }}
            />
        )
        }

        return stars;
    }

    return (
        <Flex borderWidth={1} borderRadius={8}>
        {renderStars()}
        </Flex>
    );
}