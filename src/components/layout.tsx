import { Flex } from '@chakra-ui/react';
import NavBar from './navbar';
import Footer from './footer';

function Layout({ children }) {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <NavBar />
      <Flex as="main" flex="1" flexGrow={1}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Layout;
