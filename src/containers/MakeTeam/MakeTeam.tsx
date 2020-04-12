import React, { useState } from "react";
import { Grid, Button, Divider, Segment, Rail, Label } from "semantic-ui-react";
import produce from "immer";

import Field from "../../components/Field";
import Roster from "../../components/Roster";
import TeamLayout from "../../components/TeamLayout";

import { IPlayer, ILayout, IPosition } from "./types";
import CreatePlayerButton from "../../components/CreatePlayerButton";

export interface IProps {
  players: Array<IPlayer>;
}

export default function MakeTeam(props: IProps) {
  const [positions, setPositions] = useState<Array<IPosition>>([]);
  const [players, setPlayers] = useState(props.players);

  function handlePlayerDropInPosition(player: IPlayer, positionIndex: number) {
    assignPlayerToPosition(player, positionIndex);
  }

  function handlePlayerClick(player: IPlayer) {
    const firstPositionAvailable = positions.findIndex((p) => !p.player);
    if (firstPositionAvailable > -1) {
      assignPlayerToPosition(player, firstPositionAvailable);
    }
  }

  function handlePositionDropInPosition(
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) {
    setPositions(
      produce((positions: Array<IPosition>) => {
        const playerDropped = positions[positionDroppedIndex].player;
        const playerDragged = positions[positionDraggedIndex].player;
        positions[positionDroppedIndex].player = playerDragged;
        positions[positionDraggedIndex].player = playerDropped;
      })
    );
  }

  function handleOnClear() {
    setPositions(
      produce((positions: Array<IPosition>) => {
        positions.forEach((position) => {
          delete position.player;
        });
      })
    );
    setPlayers(props.players);
  }

  function assignPlayerToPosition(player: IPlayer, positionIndex: number) {
    setPositions(
      produce((positions: Array<IPosition>) => {
        positions[positionIndex].player = player;
      })
    );

    setPlayers(
      produce((players: Array<IPlayer>) => {
        players.splice(
          players.findIndex((p) => p.id === player.id),
          1
        );
      })
    );
  }

  function handleLayoutChange(layout: ILayout) {
    setPositions(layout.positions);
    setPlayers(props.players);
  }

  return (
    <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Field
              positions={positions}
              onPositionDropInPosition={handlePositionDropInPosition}
            />

            <Rail position="left">
              <Segment>
                <TeamLayout onChange={handleLayoutChange} />
              </Segment>
            </Rail>

            <Rail position="right">
              <Segment>
                <Roster
                  players={players}
                  onPlayerDropInPosition={handlePlayerDropInPosition}
                  onPlayerClick={handlePlayerClick}
                />
                <Divider />
                <CreatePlayerButton>New</CreatePlayerButton>
                <Button onClick={handleOnClear}>Reset</Button>
              </Segment>
            </Rail>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button positive disabled>
            Share your team!
          </Button>
          <br />
          <Label basic pointing>
            Coming soon
          </Label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
