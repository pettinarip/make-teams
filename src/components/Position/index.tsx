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
  showName?: boolean;
}

function Position(
  { position, isActive, showName }: IProps,
  ref: Ref<HTMLDivElement>
) {
  const player = position.player;

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
      {player && (
        <Label color="teal" floating>
          {player.number}
        </Label>
      )}
      {player && showName && (
        <Name>{`${player.lastName}, ${player.firstName}`}</Name>
      )}
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

const Name = styled.span`
  position: absolute;
  left: -20px;
  width: 80px;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default forwardRef(Position);
