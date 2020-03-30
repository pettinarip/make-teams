import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import {
  Container,
  Grid,
  Button,
  Divider,
  Segment,
  Rail,
  Label
} from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import produce from "immer";

import Field from "../../components/Field";
import Roster from "../../components/Roster";
import TeamLayout from "../../components/TeamLayout";

import { IPlayer, ILayout } from "./types";
import { layouts, players as initialPlayers } from "./dataset";

export interface IProps extends RouteComponentProps {}

export default function MakeTeam(props: IProps) {
  const [layout, setLayout] = useState(layouts[0]);
  const [players, setPlayers] = useState(initialPlayers);

  function handlePlayerDropInPosition(player: IPlayer, positionIndex: number) {
    assignPlayerToPosition(player, positionIndex);
  }

  function handlePlayerClick(player: IPlayer) {
    const firstPositionAvailable = layout.positions.findIndex(p => !p.player);
    if (firstPositionAvailable > -1) {
      assignPlayerToPosition(player, firstPositionAvailable);
    }
  }

  function handlePositionDropInPosition(
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) {
    setLayout(
      produce((layout: ILayout) => {
        const playerDropped = layout.positions[positionDroppedIndex].player;
        const playerDragged = layout.positions[positionDraggedIndex].player;
        layout.positions[positionDroppedIndex].player = playerDragged;
        layout.positions[positionDraggedIndex].player = playerDropped;
      })
    );
  }

  function handleOnClear() {
    const initialLayout = layouts.find(l => l.id === layout.id);
    setLayout(initialLayout as ILayout);
    setPlayers(initialPlayers);
  }

  function assignPlayerToPosition(player: IPlayer, positionIndex: number) {
    setLayout(
      produce((layout: ILayout) => {
        layout.positions[positionIndex].player = player;
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

  function handleLayoutChange(selectedLayout: ILayout) {
    setLayout(selectedLayout);
    setPlayers(initialPlayers);
  }

  return (
    <Container>
      <DndProvider backend={Backend}>
        <Grid centered columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Field
                  positions={layout.positions}
                  onPositionDropInPosition={handlePositionDropInPosition}
                />

                <Rail position="left">
                  <Segment>
                    <TeamLayout
                      layouts={layouts}
                      selected={layout}
                      onChange={handleLayoutChange}
                    />
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
                    <Button onClick={handleOnClear}>Reset positions</Button>
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
      </DndProvider>
    </Container>
  );
}
