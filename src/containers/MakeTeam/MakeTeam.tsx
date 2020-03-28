import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { Container, Grid, Button, Divider } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import produce from "immer";

import Field from "../../components/Field";
import Roster from "../../components/Roster";

import { IPosition, IPlayer } from "./types";
import {
  positions as initialPositions,
  players as initialPlayers
} from "./dataset";

export interface IProps extends RouteComponentProps {}

export default function MakeTeam(props: IProps) {
  const [positions, setPositions] = useState(initialPositions);
  const [players, setPlayers] = useState(initialPlayers);

  function handlePlayerDropInPosition(player: IPlayer, position: IPosition) {
    assignPlayerToPosition(player, position);
  }

  function handlePlayerClick(player: IPlayer) {
    const firstPositionAvailable = positions.find(p => !p.player);
    if (firstPositionAvailable) {
      assignPlayerToPosition(player, firstPositionAvailable);
    }
  }

  function handlePositionDropInPosition(
    positionDragged: IPosition,
    positionDropped: IPosition
  ) {
    setPositions(
      produce((positions: Array<IPosition>) => {
        positions[
          positions.findIndex(p => p.id === positionDropped.id)
        ].player = positionDragged.player;

        positions[
          positions.findIndex(p => p.id === positionDragged.id)
        ].player = positionDropped.player;
      })
    );
  }

  function handleOnClear() {
    setPositions(initialPositions);
    setPlayers(initialPlayers);
  }

  function assignPlayerToPosition(player: IPlayer, position: IPosition) {
    setPositions(
      produce((positions: Array<IPosition>) => {
        positions[
          positions.findIndex(p => p.id === position.id)
        ].player = player;
      })
    );

    setPlayers(
      produce((players: Array<IPlayer>) => {
        players.splice(
          players.findIndex(p => p.id === player.id),
          1
        );
      })
    );
  }

  return (
    <Container>
      <DndProvider backend={Backend}>
        <Grid>
          <Grid.Column textAlign="right" width={8}>
            <Field
              positions={positions}
              onPositionDropInPosition={handlePositionDropInPosition}
            />
          </Grid.Column>
          <Grid.Column textAlign="left" width={8}>
            <Roster
              players={players}
              onPlayerDropInPosition={handlePlayerDropInPosition}
              onPlayerClick={handlePlayerClick}
            />
            <Divider />
            <Button onClick={handleOnClear}>Reset positions</Button>
          </Grid.Column>
        </Grid>
      </DndProvider>
    </Container>
  );
}
