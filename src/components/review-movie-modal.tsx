import React, { useState } from 'react';
import { bookmarkStore } from "@/lib/store";
import { BookmarkedMovie } from "@/types";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex, 
    Text,
    Textarea,
  } from '@chakra-ui/react'
import { COLOR_SCHEMES } from '@/helpers/constants';
import { Movie } from '@/types/rapidapi-movies';

interface ReviewMovieModalProps {
    movie: Movie
}

function ReviewMovieModal({ movie, handleUpdateReview, onReviewTextChange }: ReviewMovieModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex flexDirection="row" alignItems="center">
              <Text mr={3}>My Review:</Text>
              <Textarea
                borderColor="gray.300"
                placeholder="Write your review here..."
                onChange={onReviewTextChange}
                onBlur={handleUpdateReview}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )

}

export default ReviewMovieModal