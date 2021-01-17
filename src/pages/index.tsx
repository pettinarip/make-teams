import { Skeleton, Stack } from "@chakra-ui/react";

import { useAuth } from "../contexts/auth";
import MakeTeam from "../containers/MakeTeam";

export default function Index() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Stack maxW={{ xl: 1200 }} m="0 auto" data-testid="loading">
        <Skeleton height={6} />
        <Skeleton height={6} />
        <Skeleton height={6} />
      </Stack>
    );
  }

  return <MakeTeam />;
}
