import { useRouter } from "next/router";
import { Box, ChakraProps, Flex, Link } from "@chakra-ui/core";

import useLogout from "../../dal/user/useLogout";
import { useAuth } from "../../contexts/auth";
import DarkModeSwitch from "../DarkModeSwitch";

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
        <Box mr={6} color="blue.500">
          {username}
        </Box>
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
