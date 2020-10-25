import React, { forwardRef, Ref } from "react";
import { Box, Center, Spinner, useColorMode } from "@chakra-ui/core";
import styled from "@emotion/styled";

export const ID_ATTR = "field";

export interface IProps {
  loading?: boolean;
  children: React.ReactNode;
}

function Field(props: IProps, ref: Ref<HTMLDivElement>) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box
      pos="relative"
      bg={isDark ? "green.600" : "green.400"}
      w={{ base: "100%", sm: 327 }}
      borderRadius="lg"
      boxShadow="0 2px 12px #0c112b66"
      id={ID_ATTR}
      data-testid={ID_ATTR}
      ref={ref}
    >
      {props.loading && (
        <Box pos="absolute" w="100%" h="100%">
          <Center h="100%">
            <Spinner />
          </Center>
        </Box>
      )}
      <Positions>{props.children}</Positions>
    </Box>
  );
}

const Positions = styled.div`
  position: relative;
  height: 500px;
`;

export default forwardRef(Field);
