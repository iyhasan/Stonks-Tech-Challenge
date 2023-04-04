import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

interface PathType {
    path: string,
    label: string,
    color: string | null,
}

const paths = [
  {
    path: '/',
    label: 'Home',
    color: 'blue.100',
  },
  {
    path: '/bookmark-overview',
    label: 'Bookmarked Movies',
    color: null,
  },
];

const NavBar = () => {
  const router = useRouter();

  return (
    <Box bg="gray.700" py={4}>
      <Flex>
        {paths.map((pathObj, index) => (
          <NextLink key={index} href={pathObj.path}>
            <Link
              mx={4}
              fontWeight={router.pathname === pathObj.path ? 'bold' : 'normal'}
              fontSize="lg"
              color={pathObj.color || 'white'}
            >
              {pathObj.label}
            </Link>
          </NextLink>
        ))}
      </Flex>
    </Box>
  );
};

export default NavBar;
