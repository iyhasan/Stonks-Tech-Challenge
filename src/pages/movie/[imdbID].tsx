import { Box, Flex, Heading, Image, Text, IconButton, Spacer, Center, Textarea, Grid, GridItem, useToken } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BookmarkedMovie, FullMovieProfile, Rating } from '@/types';
import { bookmarkStore } from '@/lib/store';
import { StarIcon, AddIcon, ViewIcon } from '@chakra-ui/icons';
import { COLOR_SCHEMES, PLACEHOLDER_MOVIE_POSTER, reviewSourceToLogoUrl, REVIEW_SOURCE_KEY} from '@/helpers/constants';
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
  const [ORANGE, YELLOW] = useToken('colors', [COLOR_SCHEMES.orange, COLOR_SCHEMES.yellow]);

  const bookmarkedInfo = bookmarkStore((state) => state.fetchById(imdbID as string));
  const bookmarkIconColor = !!bookmarkedInfo ? 'yellow.400' : 'gray';
  const watchedIconColor = !!bookmarkedInfo && bookmarkedInfo.isWatched ? 'yellow.400' : 'gray';

  const [reviewText, setReviewText] = useState<string>(bookmarkedInfo ? bookmarkedInfo.review : '');

  useEffect(() => {
    setReviewText(bookmarkedInfo?.review || '');
  }, [bookmarkedInfo]);

  useEffect(() => {

    setReviewText(bookmarkedInfo?.review || '');

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

    bookmarkStore.getState().updateMovie(imdbID as string, {
      ...bookmarkedInfo,
      isWatched: !bookmarkedInfo.isWatched
    })
  }

  const handleUpdateReview = () => {
    if (!bookmarkedInfo) return;

    bookmarkStore.getState().updateMovie(imdbID as string, {
      ...bookmarkedInfo,
      review: reviewText,
    })
  };

  const gridList = [
    {
      label: 'Directed By',
      valueList: movie.Director.split(',')
    },
    {
      label: 'Written By',
      valueList: movie.Writer.split(',')
    },
    {
      label: 'Actors',
      valueList: movie.Actors.split(',')
    },
    {
      label: 'Genre',
      valueList: movie.Genre.split(',')
    },
    {
      label: 'Languages',
      valueList: movie.Language.split(',')
    },
    {
      label: 'Countries',
      valueList: movie.Country.split(',')
    }
  ]

  return (
    (
        <Box width="100%" backgroundColor={COLOR_SCHEMES.main} color="white" px={2}>

          <Flex>
            <Box pl="5%" flexGrow={1}>

              <Box>
                <Flex direction="row" alignItems="center" justifyItems="center">
                  <Text 
                  fontSize="5xl" 
                  as="b"
                  bgClip="text"
                  bgGradient={`linear-gradient(90deg, ${ORANGE} 0%, ${YELLOW} 100%);`}
                  >{movie.Title}</Text>
                  <Box ml={4} borderWidth={2} mt={2} borderRadius={5} px={3} color="yellow.400" borderColor="yellow.400">
                    <Text fontSize="xl" as="b" >{movie.Rated}</Text>
                  </Box>
                </Flex>
              </Box>

              <Box>
                <Flex mt={3}>
                  <Center 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMovieBookmark(imdbID as string);
                    }}
                    _hover={{
                      backgroundColor: 'gray.100'
                    }}
                    borderWidth={1}
                    borderColor={COLOR_SCHEMES.yellow}
                    borderRadius={5}
                    px={3}
                    py={2}
                    color={bookmarkIconColor}
                    >
                      <AddIcon />
                    </Center>

                    <>
                    {
                      bookmarkedInfo ? (
                        <Box ml={3}>
                          <WatchedRatingSlider 
                            imdbID={imdbID as string}
                            baseColor={null}
                            baseBackgroundColor={null}
                            hoveringColor={null}
                            hoveringBackgroundColor={null}
                            selectedBackgroundColor={null}
                            selectedColor={null}
                          />
                        </Box>
                      ) : null
                    }
                    </>
                </Flex>
              </Box>




              <Flex direction="column" mt="20px">
                <Flex width="100%" justifyContent="space-around">
                    { movie.Ratings.map((rating: Rating, index) => (
                      <Box key={`movie_rating_${index+1}`} width="30%" py={10}>
                        <Image src={reviewSourceToLogoUrl[rating.Source as REVIEW_SOURCE_KEY]} height="50px" m="auto"/>
                        <Center>
                          <Text color={scoreToColor(rating.Value)} m="auto" as="b" fontSize="xl" mt={2}>{parseRating(rating.Value)}%</Text>
                        </Center>
                      </Box>
                    ))}
                </Flex>
              </Flex>

              
                {
                  gridList.map((row, index) => (
                    <Grid key={`movie_info_row_${index}`} templateColumns='repeat(5, 1fr)'>
                      <GridItem colSpan={1}>
                        <Flex align="center" height="100%">
                          {row.label}
                        </Flex>
                      </GridItem>
                      <GridItem colSpan={4}>
                        <Flex direction="row">
                        {row.valueList.map((name: string, colIdx: number) => (
                          <Box 
                            key={`${index+1}_${colIdx+1}_info`}
                            px={3} 
                            borderWidth={1} 
                            mr={3} 
                            my={2} 
                            py={1}
                            borderRadius={5}
                            borderColor={COLOR_SCHEMES.yellow}>
                            <Text fontSize="md">{name}</Text>
                          </Box>
                        ))}
                        </Flex>
                      </GridItem>
                    </Grid>
                  ))
                }
              

              <>
              {
                bookmarkedInfo ? (
                  <Grid templateColumns='repeat(5, 1fr)'>
                    <GridItem colSpan={1}>
                      <Flex align="center" height="100%">
                        My Review
                      </Flex>
                    </GridItem>
                    <GridItem colSpan={4}>
                      <Textarea
                              mt={3}
                              borderColor={COLOR_SCHEMES.yellow}
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
            <Box flexGrow={1} px={5}>
              <Image width="100%" src={movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_MOVIE_POSTER} objectFit="contain" />
            </Box>
          </Flex>

          
           
        </Box>
      )
  )
}

export default MovieOverview;
