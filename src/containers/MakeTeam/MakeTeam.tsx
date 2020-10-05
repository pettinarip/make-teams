import { useState, useCallback, useEffect } from "react";
import { Box, Center, Grid } from "@chakra-ui/core";

import FieldStatic from "../../components/FieldStatic";
// import Controls from "../../components/Controls";
import TeamLayout from "../TeamLayout";
// import Roster from "../Roster";
// import ShareTeam from "../ShareTeam";

import { ILayout, IPlayer, IPosition } from "./types";
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
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <TeamLayout onChange={handleLayoutChange} />

        <Center>
          <FieldStatic
            showNames={showNames}
            positions={assignments}
            onPositionDropInPosition={handlePositionDropInPosition}
          />
        </Center>

        {/* <Roster
          usedPlayersIds={usedPlayersIds}
          onPlayerDropInPosition={handlePlayerDropInPosition}
          onPlayerClick={handlePlayerClick}
          onResetClick={handleOnClear}
        /> */}
      </Grid>

      <Box>
        {/* <Controls
          showNames={showNames}
          onShowNamesChange={handleShowNamesChange}
        /> */}
      </Box>
      <Box>{/* <ShareTeam positions={assignments} /> */}</Box>
    </Box>
  );
}
