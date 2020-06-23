import React from "react";
import styled from "@emotion/styled";
import { Loader, Dimmer } from "semantic-ui-react";

export const ID_ATTR = "field";

export interface IProps {
  loading?: boolean;
  children: React.ReactElement;
}

export default function Field(props: IProps) {
  return (
    <FieldWrapper id={ID_ATTR} data-testid={ID_ATTR}>
      {props.loading && (
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
      )}
      <Positions>{props.children}</Positions>
    </FieldWrapper>
  );
}

// The bottom padding is to have a safe space to allocate players names
const FieldWrapper = styled.div`
  background-color: lightgreen;
  // padding-bottom: 10px;
`;

const Positions = styled.div`
  position: relative;
  height: 500px;
`;
