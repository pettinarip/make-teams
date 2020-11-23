import React, { forwardRef, Ref } from "react";
import styled from "@emotion/styled";

import Position, { IProps as IPositionProps } from "../Position";

export interface IProps extends IPositionProps {
  onClick?: () => void;
}

function PositionStatic(
  { position, onClick, ...restProps }: IProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <Wrapper ref={ref} x={position.x} y={position.y} onClick={onClick}>
      <Position position={position} {...restProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ x: number; y: number }>(
  {
    position: "absolute",
    textAlign: "center",
    marginLeft: -20,
  },
  (props) => ({
    left: `${props.x}%`,
    top: `${props.y}%`,
  })
);

export default forwardRef(PositionStatic);
