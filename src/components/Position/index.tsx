/** @jsx jsx */
import { forwardRef, Ref } from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Label } from "semantic-ui-react";

import { IPosition } from "../../containers/MakeTeam/types";
import playerImg from "../../images/christian.jpg";

export interface IProps {
  position: IPosition;
  isActive?: boolean;
}

function Position({ position, isActive }: IProps, ref: Ref<HTMLDivElement>) {
  return (
    <Wrapper ref={ref} x={position.x} y={position.y} data-testid="position">
      <Img isActive={!!isActive}>
        {position.player ? (
          <img
            css={css`
              width: 100%;
            `}
            src={playerImg}
            alt=""
          />
        ) : (
          ""
        )}
      </Img>
      {position.player && (
        <Label color="teal" floating>
          {position.player.number}
        </Label>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ x: number; y: number }>(
  {
    position: "absolute",
    textAlign: "center",
    lineHeight: "40px",
    marginLeft: -20,
  },
  (props) => ({
    left: `${props.x}%`,
    top: `${props.y}%`,
  })
);

const Img = styled.div<{ isActive: boolean }>(
  {
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
  },
  (props) => ({
    backgroundColor: props.isActive ? "lightgray" : "white",
  })
);

export default forwardRef(Position);
