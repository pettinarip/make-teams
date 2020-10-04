import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/core";

import useAuth from "../../domain/user/useAuth";
import useLogout from "../../dal/user/useLogout";

export default function Menu() {
  const router = useRouter();
  const { user } = useAuth();
  const [logout] = useLogout();

  const username = getUsername(user);

  async function handleSignOut() {
    await logout();
    router.push("/login");
  }

  return (
    <Flex align="center" justifyContent="space-between">
      <Box>Home</Box>
      <Box>
        <Box>{username}</Box>
        <Box onClick={handleSignOut}>Sign out</Box>
      </Box>
    </Flex>
  );
}

function getUsername(user: any): string {
  if (!user) return "";
  return user.attributes ? user.attributes.email : user.username;
}
