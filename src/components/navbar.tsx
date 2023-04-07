import { Box, Flex, Text, Link, Spacer, useToken } from '@chakra-ui/react';
import Search from '@/components/search';
import { useRouter } from 'next/router';
import { COLOR_SCHEMES } from '@/helpers/constants';

interface PathType {
    path: string,
    label: string,
    color: string | null,
}

const paths = [
  {
    path: '/',
    label: 'Home',
    color: COLOR_SCHEMES.yellow,
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
    <Box bg={COLOR_SCHEMES.main} py={4}>
      <Flex alignItems="center">
        {
          paths.filter((p) => p.path === '/').map((pathObj, index) => (
            <Link
              key={`Home_NAVBAR`}
              href={pathObj.path}
              mx={4}
              fontWeight={router.pathname === pathObj.path ? 'bold' : 'normal'}
              fontSize="lg"
              bgClip="text"
              bgGradient={pathObj.path === '/' ? `linear-gradient(90deg, ${useToken('colors', COLOR_SCHEMES.orange)} 0%, ${useToken('colors', COLOR_SCHEMES.yellow)} 100%);` : pathObj.color}
            >
              {pathObj.label}
            </Link>
          ))
        }
        {paths.filter((p) => p.path !== '/').map((pathObj, index) => (
            <Link
              key={`${pathObj.label}_NAVBAR`}
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
