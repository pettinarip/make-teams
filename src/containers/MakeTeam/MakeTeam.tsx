import React, { useState, useCallback, useEffect } from "react";
import { Grid, Segment, Rail } from "semantic-ui-react";

import FieldStatic from "../../components/FieldStatic";
import Controls from "../../components/Controls";
import TeamLayout from "../TeamLayout";
import Roster from "../Roster";
import ShareTeam from "../ShareTeam";

import { Player as IPlayer } from "../../graphql/API";
import { ILayout, IPosition } from "./types";
import useAssignments from "./useAssignments";

export interface IProps {}

export default function MakeTeam(__props: IProps) {
  const [positions, setPositions] = useState<Array<IPosition>>([]);
  const [usedPlayersIds, setUsedPlayersIds] = useState<Array<string>>([]);
  const [showNames, setShowNames] = useState(false);

  const { assignments, assign, toggle, reset } = useAssignments(positions);

  useEffect(() => {
    setUsedPlayersIds(
      assignments.map((a) => a.player?.id).filter((id) => !!id) as string[]
    );
  }, [assignments]);

  const handleLayoutChange = useCallback(
    (layout: ILayout) => {
      setPositions(layout.positions);
    },
    [setPositions]
  );

  const handlePlayerDropInPosition = useCallback(
    (player: IPlayer, positionIndex: number) => {
      assign(player, positionIndex);
    },
    [assign]
  );

  const handlePlayerClick = useCallback(
    (player: IPlayer) => {
      assign(player);
    },
    [assign]
  );

  const handlePositionDropInPosition = useCallback(
    (draggedIndex: number, droppedIndex: number) => {
      toggle(draggedIndex, droppedIndex);
    },
    [toggle]
  );

  const handleOnClear = useCallback(() => {
    reset();
  }, [reset]);

  const handleShowNamesChange = useCallback(() => {
    setShowNames((showNames) => !showNames);
  }, []);

  return (
    <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <FieldStatic
              showNames={showNames}
              positions={assignments}
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
          <Controls
            showNames={showNames}
            onShowNamesChange={handleShowNamesChange}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <ShareTeam positions={assignments} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
