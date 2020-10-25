import React from "react";
import { Avatar, Flex, Box, Text, Badge } from "@chakra-ui/core";
import { useDrag, DragSourceMonitor } from "react-dnd";

import { IPlayer } from "../../containers/MakeTeam/types";

export const ITEM_TYPE = "player";

export interface IProps {
  player: IPlayer;
  onDropInPosition: (player: IPlayer, positionIndex: number) => void;
  onClick: (player: IPlayer) => void;
}

export default function Player({ player, onDropInPosition, onClick }: IProps) {
  const [, drag] = useDrag({
    item: { player, type: ITEM_TYPE },
    end: (
      __item: { player: IPlayer } | undefined,
      monitor: DragSourceMonitor
    ) => {
      const dropResult = monitor.getDropResult();
      if (player && dropResult && dropResult.index > -1) {
        onDropInPosition(player, dropResult.index);
      }
    },
  });

  function handleOnClick() {
    onClick(player);
  }

  const playerName = `${player.lastName}, ${player.firstName}`;

  return (
    <Flex
      ref={drag}
      onClick={handleOnClick}
      data-testid="player"
      cursor="pointer"
    >
      <Avatar name={playerName} />
      <Box ml="3">
        <Text fontWeight="bold">
          {playerName}
          <Badge ml="1">{player.number}</Badge>
        </Text>
        <Text fontSize="sm" d={{ base: "none", lg: "block" }}>
          Defender
        </Text>
      </Box>
    </Flex>
  );
}
