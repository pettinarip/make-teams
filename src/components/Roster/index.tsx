import React from "react";
import { List, Header } from "semantic-ui-react";

import { IPlayer, IPosition } from "../../containers/MakeTeam/types";
import Player from "../Player";

export interface IProps {
  players: Array<IPlayer>;
  onPlayerDropInPosition: (player: IPlayer, positionIndex: number) => void;
  onPlayerClick: (player: IPlayer) => void;
}

export default function Roster({
  players,
  onPlayerDropInPosition,
  onPlayerClick
}: IProps) {
  return (
    <div>
      <Header as="h2">Roster ({players.length})</Header>
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
    </div>
  );
}
