import React, { forwardRef, Ref } from "react";
import styled from "@emotion/styled";
import { Loader, Dimmer } from "semantic-ui-react";

export const ID_ATTR = "field";

export interface IProps {
  loading?: boolean;
  children: React.ReactNode;
}

function Field(props: IProps, ref: Ref<HTMLDivElement>) {
  return (
    <FieldWrapper id={ID_ATTR} data-testid={ID_ATTR} ref={ref}>
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

export default forwardRef(Field);
