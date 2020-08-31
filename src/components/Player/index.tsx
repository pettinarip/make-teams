import React from "react";
import { Label as LabelSem } from "semantic-ui-react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import styled from "@emotion/styled";

import { IPlayer } from "../../containers/MakeTeam/types";
import playerImg from "../../images/christian.jpg";

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

  return (
    <div ref={drag}>
      <Label as="a" onClick={handleOnClick} image data-testid="player">
        <img src={playerImg} alt="" />
        <Name>{`${player.lastName}, ${player.firstName}`}</Name>
        <LabelSem.Detail>{player.number}</LabelSem.Detail>
      </Label>
    </div>
  );
}

const Label = styled(LabelSem)`
  display: flex !important;
`;

const Name = styled.span`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
