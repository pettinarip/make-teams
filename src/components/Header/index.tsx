import { Box, Heading, Text } from "@chakra-ui/core";

export default function Header() {
  return (
    <Box textAlign="center" padding={10} mb={30}>
      <Heading as="h1">Make a Team</Heading>
      <Text>Choose your team layout and build your team!</Text>
    </Box>
  );
}
