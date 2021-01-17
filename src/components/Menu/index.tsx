import { useRouter } from "next/router";
import { Box, ChakraProps, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import useLogout from "../../dal/user/useLogout";
import { useAuth } from "../../contexts/auth";
import DarkModeSwitch from "../DarkModeSwitch";

export default function Menu(props: ChakraProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync: logout } = useLogout();

  const username = getUsername(user);

  async function handleSignOut() {
    await logout();
    router.push("/login");
  }

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
        {user ? (
          <>
            <Box mr={6} color="blue.500">
              {username}
            </Box>
            <Box>
              <Link onClick={handleSignOut}>Logout</Link>
            </Box>
          </>
        ) : (
          <>
            <Box mr={6}>
              <NextLink href="/login">
                <Link>Login</Link>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/signup">
                <Link>Sign Up</Link>
              </NextLink>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}

function getUsername(user: any): string {
  if (!user) return "";
  return user.email || user.username;
}
