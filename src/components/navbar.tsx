import { Box, Flex, Text, Link, Spacer } from '@chakra-ui/react';
import Search from '@/components/search';
import { useRouter } from 'next/router';

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
      <Flex alignItems="center">
        {paths.map((pathObj, index) => (
            <Link
              key={index}
              href={pathObj.path}
              mx={4}
              fontWeight={router.pathname === pathObj.path ? 'bold' : 'normal'}
              fontSize="lg"
              color={pathObj.color || 'white'}
            >
              {pathObj.label}
            </Link>
        ))}
        <Search/>
      </Flex>
    </Box>
  );
};

export default NavBar;
