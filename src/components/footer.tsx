import { Box, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { COLOR_SCHEMES } from '@/helpers/constants';

const Footer = () => {
  return (
    <Box as="footer" role="contentinfo" mx="auto" mt={12} mb={4} px={4} color={COLOR_SCHEMES.fontMain}>
      <Text fontSize="sm" textAlign="center">
        StonksBuster © 2023 | Developed by{' '}
        <Link href="https://github.com/iyhasan" isExternal>
          Ishaq Yousef HajHasan <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
