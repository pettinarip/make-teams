import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";

import Position, { IProps as IPositionProps } from "../Position";

export interface IProps extends Omit<IPositionProps, "style"> {
  onClick?: () => void;
  style: { x: number; y: number };
}

const PositionStatic = forwardRef<HTMLDivElement, IProps>(
  ({ position, onClick, style, ...restProps }, ref) => {
    return (
      <Wrapper ref={ref} style={style} onClick={onClick}>
        <Position position={position} {...restProps} />
      </Wrapper>
    );
  }
);

const Wrapper = styled(animated.div)({
  position: "absolute",
  display: "inline-block",
  textAlign: "center",
  marginLeft: -24,
  marginTop: -24,
});

export default PositionStatic;
