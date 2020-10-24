import { useState, useCallback, useEffect } from "react";
import { Box, Center, ChakraProps, Flex, useColorMode } from "@chakra-ui/core";

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
  const [usedPlayersIds, setUsedPlayersIds] = useState<Array<string>>([]);
  const [showNames, setShowNames] = useState(false);
  const { colorMode } = useColorMode();

  const isDark = colorMode === "dark";

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

          <Box flex={1} mx={{ base: 0, lg: 4 }} mr={{ base: 4 }}>
            <FieldStatic
              showNames={showNames}
              positions={assignments}
              onPositionDropInPosition={handlePositionDropInPosition}
            />
          </Box>

          <Roster
            flex={1}
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
        <ShareTeam positions={assignments} />
      </Box>
    </Box>
  );
}
