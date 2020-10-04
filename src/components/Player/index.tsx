import React from "react";
import { Avatar, Tag, TagLabel } from "@chakra-ui/core";
import { useDrag, DragSourceMonitor } from "react-dnd";
import styled from "@emotion/styled";

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
      item: { player: IPlayer } | undefined,
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
    <div ref={drag}>
      <Tag onClick={handleOnClick} data-testid="player">
        <Avatar
          src="/christian.jpg"
          size="xs"
          name={playerName}
          ml={-1}
          mr={2}
        />
        <Name>{playerName}</Name>
        <TagLabel>{player.number}</TagLabel>
      </Tag>
    </div>
  );
}

const Name = styled.span`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
