/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Badge } from "@chakra-ui/core";
import styled from "@emotion/styled";

import { IPosition, IShareLinkPosition } from "../../containers/MakeTeam/types";

export interface IProps {
  position: IPosition | IShareLinkPosition;
  isActive?: boolean;
  showName?: boolean;
}

export default function Position({ position, isActive, showName }: IProps) {
  const player = position.player;

  return (
    <div data-testid="position">
      <Img isActive={!!isActive}>
        {position.player ? (
          <img
            css={css`
              width: 100%;
            `}
            src="/christian.jpg"
            alt=""
          />
        ) : (
          ""
        )}
      </Img>
      {player && <Badge>{player.number}</Badge>}
      {player && showName && (
        <Name>{`${player.lastName}, ${player.firstName}`}</Name>
      )}
    </div>
  );
}

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
