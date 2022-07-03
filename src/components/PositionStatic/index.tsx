import React, { forwardRef } from "react";
import styled from "@emotion/styled";

import Position, { IProps as IPositionProps } from "../Position";

export interface IProps extends IPositionProps {
  onClick?: () => void;
}

const PositionStatic = forwardRef<HTMLDivElement, IProps>(
  ({ position, onClick, ...restProps }, ref) => {
    return (
      <Wrapper ref={ref} x={position.x} y={position.y} onClick={onClick}>
        <Position position={position} {...restProps} />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div<{ x: number; y: number }>(
  {
    position: "absolute",
    textAlign: "center",
    marginLeft: -24,
    marginTop: -24,
  },
  (props) => ({
    left: `${props.x}%`,
    top: `${props.y}%`,
  })
);

export default PositionStatic;
