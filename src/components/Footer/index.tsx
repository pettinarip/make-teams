import { Box } from "@chakra-ui/core";
import { Link, Text } from "@chakra-ui/core";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Footer() {
  return (
    <Box mt={100} textAlign="center">
      <Text fontSize="sm">
        by{" "}
        <Link href="https://github.com/pettinarip" color="blue.500" isExternal>
          @pettinarip <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </Box>
  );
}
