import { useRouter } from "next/router";
import NextLink from "next/link";
import { Box, ChakraProps, Flex, Link } from "@chakra-ui/core";

import useAuth from "../../domain/user/useAuth";
import useLogout from "../../dal/user/useLogout";

export default function Menu(props: ChakraProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [logout] = useLogout();

  const username = getUsername(user);

  async function handleSignOut() {
    await logout();
    router.push("/login");
  }

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      {...props}
    >
      <Box>
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
      </Box>
      <Flex>
        <Box mr={6}>{username}</Box>
        <Box>
          <Link onClick={handleSignOut}>Logout</Link>
        </Box>
      </Flex>
    </Flex>
  );
}

function getUsername(user: any): string {
  if (!user) return "";
  return user.email || user.username;
}
