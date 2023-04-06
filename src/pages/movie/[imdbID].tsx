import { Box, Flex, Heading, Image, Text, IconButton, Spacer, Center, Textarea, Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BookmarkedMovie, FullMovieProfile, Rating } from '@/types';
import { bookmarkStore } from '@/lib/store';
import { StarIcon, AddIcon, ViewIcon } from '@chakra-ui/icons';
import { reviewSourceToLogoUrl } from '@/helpers/constants';
import RatingSlider from '@/components/rating-slider';
import WatchedRatingSlider from '@/components/watched-rating-slider';


function parseRating(ratingStr: string) {
  let percentage;

  if (ratingStr.includes('%')) {
    percentage = parseFloat(ratingStr);
  } else {
    const [rating, maxRating] = ratingStr.split('/');
    percentage = (parseFloat(rating) / parseFloat(maxRating)) * 100;
  }

  return parseFloat(percentage.toFixed(1))
}

const scoreToColor = (value: string) => {

  const percentage = parseRating(value);

  if (percentage >= 90) return 'green';
  else if (percentage >= 80) return 'yellow';
  else if (percentage >= 70) return 'orange';
  else return 'red';
}

const MovieOverview = () => {
  const router = useRouter();
  const { imdbID } = router.query;
  const [movie, setMovie] = useState<FullMovieProfile | null>(null);

  const bookmarkedInfo = bookmarkStore((state) => state.fetchById(imdbID));
  const bookmarkIconColor = !!bookmarkedInfo ? 'yellow.400' : 'gray';
  const watchedIconColor = !!bookmarkedInfo && bookmarkedInfo.isWatched ? 'yellow.400' : 'gray';

  const [reviewText, setReviewText] = useState<string>('');

  useEffect(() => {

    setReviewText(bookmarkedInfo?.review);

    if (imdbID) {
      fetch(`/api/movie?imdbID=${imdbID}`)
        .then((res) => res.json())
        .then((data) => setMovie(data));
    }
  }, [imdbID]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const toggleMovieBookmark = (imdbID: string) => {
    const bookmarkMovie: BookmarkedMovie = {
      movie: {
        Title: movie.Title,
        imdbID: imdbID,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster,

      },
      imdbID: movie.imdbID,
      rating: 0,
      review: '',
      isWatched: false
    }

    if (bookmarkStore.getState().fetchById(imdbID)) {
      bookmarkStore.getState().removeMovie(imdbID);
    } else {
      bookmarkStore.getState().addMovie(bookmarkMovie);
    }
  }

  const toggleMovieWatched = () => {
    if (!bookmarkedInfo) return;

    bookmarkStore.getState().updateMovie(imdbID, {
      ...bookmarkedInfo,
      isWatched: !bookmarkedInfo.isWatched
    })
  }

  const handleUpdateReview = () => {
    if (!bookmarkedInfo) return;

    console.log(reviewText)

    bookmarkStore.getState().updateMovie(imdbID, {
      ...bookmarkedInfo,
      review: reviewText,
    })
  };

  const languageList = movie.Language.split(',');
  const directorList = movie.Director.split(',');
  const writerList = movie.Writer.split(',')

  return (
    (
        <Box width="100%" backgroundColor="gray.700" color="white" px={2}>
          <Flex direction="row" minHeight="300px" maxHeight="300px"  width="100%" align="center" overflow="hidden">
            <Image src={movie.Poster} objectFit="cover" />
            <Box ml={3} flex="1" overflowY="scroll">
              <Flex direction="row" alignItems="center">
                <Text fontSize="5xl" as="b">{movie.Title}</Text>
                <Box ml={5} borderWidth={3} borderRadius={5} px={3}>
                  <Text fontSize="xl" as="b" >{movie.Rated}</Text>
                </Box>
              </Flex>
              <Flex mt={3}>
                <IconButton 
                  aria-label="Bookmark Movie"
                  variant="outline"
                  icon={<AddIcon color={bookmarkIconColor}/>}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMovieBookmark(imdbID);
                  }}
                  _hover={{
                    backgroundColor: 'gray.100'
                  }} />

                  <>
                  {
                    bookmarkedInfo ? (
                      <Box ml={3}>
                        <WatchedRatingSlider 
                          imdbID={imdbID}
                        />
                      </Box>
                    ) : null
                  }
                  </>
              </Flex>
            </Box>
          </Flex>

          <Box pl="5%">
            <Flex direction="column">
              <Flex width="100%" justifyContent="space-around">
                  { movie.Ratings.map((rating: Rating) => (
                    <Box width="30%" py={5}>
                      <Image src={reviewSourceToLogoUrl[rating.Source]} height="50px" m="auto"/>
                      <Center>
                        <Text color={scoreToColor(rating.Value)} m="auto" as="b" fontSize="xl" mt={2}>{parseRating(rating.Value)}%</Text>
                      </Center>
                    </Box>
                  ))}
              </Flex>
            </Flex>

            <Grid templateColumns='repeat(5, 1fr)'>
              <GridItem colSpan={1}>Directed By</GridItem>
              <GridItem colSpan={4}>
                <Flex direction="row">
                {directorList.map((name: string) => (
                  <Box 
                    px={3} 
                    borderWidth={1} 
                    mr={3} 
                    my={2} 
                    py={1}
                    borderRadius={5}>
                    <Text fontSize="md">{name}</Text>
                  </Box>
                ))}
                </Flex>
              </GridItem>

              <GridItem colSpan={1}>Written By</GridItem>
              <GridItem colSpan={4}>
                <Flex direction="row">
                {writerList.map((name: string) => (
                  <Box 
                    px={3} 
                    borderWidth={1} 
                    mr={3} 
                    my={2} 
                    py={1}
                    borderRadius={5}>
                    <Text fontSize="md">{name}</Text>
                  </Box>
                ))}
                </Flex>
              </GridItem>
              
              <GridItem colSpan={1}>Languages</GridItem>
              <GridItem colSpan={4}>
                <Flex direction="row">
                {languageList.map((language: string) => (
                  <Box 
                    px={3} 
                    borderWidth={1} 
                    mr={3} 
                    my={2} 
                    py={1}
                    borderRadius={5}>
                    <Text fontSize="md">{language}</Text>
                  </Box>
                ))}
                </Flex>
              </GridItem>
            </Grid>

            <>
            {
              bookmarkedInfo ? (
                <Grid templateColumns='repeat(5, 1fr)'>
                  <GridItem colSpan={1}>My Review</GridItem>
                  <GridItem colSpan={4}>
                    <Textarea
                            mt={3}
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            onBlur={handleUpdateReview}
                          />
                  </GridItem>
                </Grid>
              ) : null
            }
            </>

          </Box>

          
           
        </Box>
      )
  )
}

export default MovieOverview;
