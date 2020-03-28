import React from "react";
import styled from "@emotion/styled";
import { List } from "semantic-ui-react";

import { IPlayer, IPosition } from "../../containers/MakeTeam/types";
import Player from "../Player";

export interface IProps {
  players: Array<IPlayer>;
  onPlayerDropInPosition: (player: IPlayer, position: IPosition) => void;
  onPlayerClick: (player: IPlayer) => void;
}

export default function Roster({
  players,
  onPlayerDropInPosition,
  onPlayerClick
}: IProps) {
  return (
    <Wrapper>
      <h1>Roster ({players.length})</h1>
      <List>
        {players.map(player => (
          <List.Item key={player.id}>
            <Player
              player={player}
              onDropInPosition={onPlayerDropInPosition}
              onClick={onPlayerClick}
            />
          </List.Item>
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
`;
