import { Avatar, Badge } from "@chakra-ui/core";
import styled from "@emotion/styled";

import { IPosition, IShareLinkPosition } from "../../containers/MakeTeam/types";

export interface IProps {
  position: IPosition | IShareLinkPosition;
  isActive?: boolean;
  showName?: boolean;
}

export default function Position({ position, isActive, showName }: IProps) {
  const player = position.player;
  const playerName = `${player?.lastName}, ${player?.firstName}`;

  return (
    <div data-testid="position">
      <Avatar name={player ? playerName : ""} showBorder={isActive} />
      {player && <Badge>{player.number}</Badge>}
      {player && showName && (
        <Name>{`${player.lastName}, ${player.firstName}`}</Name>
      )}
    </div>
  );
}

const Name = styled.span`
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: 80px;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
