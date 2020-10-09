import { useEffect } from "react";
import { useRouter } from "next/router";
import { Skeleton, Stack } from "@chakra-ui/core";

import { useAuth } from "../../contexts/auth";

interface IProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: IProps) {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  const shouldRedirect = !(isLoading || error || user);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/login");
    }
  }, [shouldRedirect]);

  if (isLoading || !user) {
    return (
      <Stack m="0 auto" w={1100}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return children;
}
