import React, { forwardRef, Ref } from "react";
import { Box, Center, Spinner } from "@chakra-ui/core";
import styled from "@emotion/styled";

export const ID_ATTR = "field";

export interface IProps {
  loading?: boolean;
  children: React.ReactNode;
}

function Field(props: IProps, ref: Ref<HTMLDivElement>) {
  return (
    <FieldWrapper id={ID_ATTR} data-testid={ID_ATTR} ref={ref}>
      {props.loading && (
        <Box pos="absolute" w="100%" h="100%">
          <Center h="100%">
            <Spinner />
          </Center>
        </Box>
      )}
      <Positions>{props.children}</Positions>
    </FieldWrapper>
  );
}

// The bottom padding is to have a safe space to allocate players names
const FieldWrapper = styled.div`
  position: relative;
  background-color: lightgreen;
  width: 327px;
  // padding-bottom: 10px;
`;

const Positions = styled.div`
  position: relative;
  height: 500px;
`;

export default forwardRef(Field);
