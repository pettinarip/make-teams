import { Box, ChakraProps, Flex } from "@chakra-ui/react";

import DarkModeSwitch from "../DarkModeSwitch";

export default function Menu(props: ChakraProps) {
  return (
    <Flex
      align="center"
      justifyContent="space-between"
      fontSize="sm"
      {...props}
    >
      <Box>
        {/* <NextLink href="/">
          <Link>Home</Link>
        </NextLink> */}
      </Box>
      <Flex alignItems="center">
        <Box mr={6}>
          <DarkModeSwitch />
        </Box>
      </Flex>
    </Flex>
  );
}
