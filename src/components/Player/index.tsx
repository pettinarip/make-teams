import React from "react";
import { Avatar, Box, Text, Badge } from "@chakra-ui/react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import styled from "@emotion/styled";

import { IPlayer } from "../../containers/MakeTeam/types";

const Container = styled(animated.div)`
  display: flex;
  cursor: pointer;
  touch-action: none;
`;

export interface IProps {
  player: IPlayer;
  onDropInPosition: (player: IPlayer, positionIndex: number) => void;
  onClick: (player: IPlayer) => void;
}

export default function Player({ player, onClick }: IProps) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], tap }) => {
        if (tap) {
          onClick(player);
        }

        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    }
  );

  const playerName = `${player.lastName}, ${player.firstName}`;

  return (
    <Container {...bind()} style={{ x, y }} data-testid="player">
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
