import React, { useState, useCallback } from "react";
import { Grid, Segment, Rail } from "semantic-ui-react";
import produce from "immer";

import Field from "../../components/Field";
import TeamLayout from "../TeamLayout";
import Roster from "../Roster";

import { IPlayer, ILayout, IPosition } from "./types";
import ShareTeam from "../../components/ShareTeam";

export interface IProps {}

export default function MakeTeam(__props: IProps) {
  const [positions, setPositions] = useState<Array<IPosition>>([]);
  const [usedPlayersIds, setUsedPlayersIds] = useState<Array<number>>([]);
  const [showNames, setShowNames] = useState(false);

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
    setUsedPlayersIds([]);
  }

  function assignPlayerToPosition(player: IPlayer, positionIndex: number) {
    const previousPlayer = positions[positionIndex];

    setPositions(
      produce((positions: Array<IPosition>) => {
        positions[positionIndex].player = player;
      })
    );

    const newUsedPlayersIds = usedPlayersIds.filter(
      (id) => id !== previousPlayer.player?.id
    );

    setUsedPlayersIds([...newUsedPlayersIds, player.id]);
  }

  const handleLayoutChange = useCallback(
    (layout: ILayout) => {
      setPositions(layout.positions);
      setUsedPlayersIds([]);
    },
    [setPositions, setUsedPlayersIds]
  );

  const handleShowNamesChange = useCallback(() => {
    setShowNames((showNames) => !showNames);
  }, []);

  return (
    <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Field
              showNames={showNames}
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
                  usedPlayersIds={usedPlayersIds}
                  onPlayerDropInPosition={handlePlayerDropInPosition}
                  onPlayerClick={handlePlayerClick}
                  onResetClick={handleOnClear}
                />
              </Segment>
            </Rail>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <ShareTeam
            showNames={showNames}
            positions={positions}
            onShowNamesChange={handleShowNamesChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
