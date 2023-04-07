import { Flex } from '@chakra-ui/react';
import NavBar from './navbar';
import Footer from './footer';
import { COLOR_SCHEMES } from '@/helpers/constants';

interface LayoutProps {
  children: any
}

function Layout({ children }: LayoutProps) {
  return (
    <Flex minHeight="100vh" flexDirection="column" backgroundColor={COLOR_SCHEMES.main}>
      <NavBar />
      <Flex as="main" flex="1" flexGrow={1}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Layout;
