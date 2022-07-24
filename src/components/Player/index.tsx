import React from "react";
import { Avatar, Box, Text, Badge } from "@chakra-ui/react";
import { animated } from "@react-spring/web";
import styled from "@emotion/styled";

import { useDrag } from "../../contexts/dnd";

import { IPlayer, ItemType } from "../../containers/MakeTeam/types";

const Container = styled(animated.div)`
  display: flex;
  cursor: pointer;
  touch-action: none;
  user-select: none;
`;

export interface IProps {
  player: IPlayer;
  onClick: (player: IPlayer) => void;
}

export default function Player({ player, onClick }: IProps) {
  const { x, y, bind } = useDrag({
    type: ItemType.PLAYER,
    onTap: () => onClick(player),
    returnToOrigin: true,
  });

  const playerName = `${player.lastName}, ${player.firstName}`;

  return (
    <Container {...bind(player)} style={{ x, y }} data-testid="player">
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
    </Container>
  );
}
