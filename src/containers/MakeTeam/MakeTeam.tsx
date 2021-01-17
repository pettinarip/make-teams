import { useState, useCallback } from "react";
import { Box, ChakraProps, Flex, useColorMode } from "@chakra-ui/react";

import FieldStatic from "../../components/FieldStatic";
import Controls from "../../components/Controls";
import TeamLayout from "../TeamLayout";
import Roster from "../Roster";
import ShareTeam from "../ShareTeam";

import { ILayout, IPlayer, IPosition } from "./types";
import useAssignments from "./useAssignments";

export interface IProps extends ChakraProps {}

export default function MakeTeam(props: IProps) {
  const [positions, setPositions] = useState<Array<IPosition>>([]);
  const [showNames, setShowNames] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer>();
  const { colorMode } = useColorMode();

  const isDark = colorMode === "dark";

  const { assignments, assign, unassign, toggle, reset } = useAssignments(
    positions
  );

  const usedPlayersIds = assignments
    .map((a) => a.player?.id)
    .filter((id) => !!id) as string[];

  const handleLayoutChange = useCallback(
    (layout: ILayout) => {
      setPositions(layout.positions);
      setSelectedPlayer(undefined);
    },
    [setPositions, setSelectedPlayer]
  );

  const handlePlayerDropInPosition = useCallback(
    (player: IPlayer, positionIndex: number) => {
      assign(player, positionIndex);
      setSelectedPlayer(undefined);
    },
    [assign, setSelectedPlayer]
  );

  const handlePlayerClick = useCallback(
    (player: IPlayer) => {
      if (player !== selectedPlayer) {
        setSelectedPlayer(player);
      } else {
        setSelectedPlayer(undefined);
      }
    },
    [setSelectedPlayer]
  );

  const handlePositionDropInPosition = useCallback(
    (draggedIndex: number, droppedIndex: number) => {
      toggle(draggedIndex, droppedIndex);
    },
    [toggle]
  );

  const handlePositionClick = useCallback(
    (positionIndex: number) => {
      if (selectedPlayer) {
        assign(selectedPlayer, positionIndex);
        setSelectedPlayer(undefined);
      } else {
        const player = assignments[positionIndex].player;
        setSelectedPlayer(player);
      }
    },
    [assign, setSelectedPlayer]
  );

  const handlePositionRemove = useCallback(
    (positionIndex: number) => {
      unassign(positionIndex);
    },
    [unassign]
  );

  const handleOnClear = useCallback(() => {
    reset();
  }, [reset]);

  const handleShowNamesChange = useCallback(() => {
    setShowNames((showNames) => !showNames);
  }, []);

  return (
    <Box {...props}>
      <Box bgColor={isDark ? "gray.700" : "gray.100"} p={6} borderRadius={6}>
        <Flex
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
          flexWrap={{ base: "wrap", lg: "nowrap" }}
          h={{ base: "inherit", lg: 500 }}
        >
          <TeamLayout
            flex={{ base: "none", lg: 1 }}
            w={{ base: "100%", lg: "inherit" }}
            mb={{ base: 6, lg: 0 }}
            onChange={handleLayoutChange}
          />

          <Flex
            flex={1}
            justify={{ base: "flex-start", lg: "center" }}
            mx={{ base: 0, lg: 4 }}
            mr={{ base: 0, sm: 4 }}
          >
            <FieldStatic
              showNames={showNames}
              positions={assignments}
              // This is used to highlight the available positions when the user
              // has selected a player in the Roster and want to assign it to a
              // position in the field
              highlight={!!selectedPlayer}
              onPositionDropInPosition={handlePositionDropInPosition}
              onPositionClick={handlePositionClick}
              onPositionRemove={handlePositionRemove}
            />
          </Flex>

          <Roster
            flex={1}
            mt={{ base: 6, sm: 0 }}
            selected={selectedPlayer}
            usedPlayersIds={usedPlayersIds}
            onPlayerDropInPosition={handlePlayerDropInPosition}
            onPlayerClick={handlePlayerClick}
            onResetClick={handleOnClear}
          />
        </Flex>
      </Box>

      <Box mt={30}>
        <Controls
          showNames={showNames}
          onShowNamesChange={handleShowNamesChange}
        />
      </Box>
      <Box mt={6}>
        <ShareTeam positions={assignments} showNames={showNames} />
      </Box>
    </Box>
  );
}
