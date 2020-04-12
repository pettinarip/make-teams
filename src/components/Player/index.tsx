import React from "react";
import { Label } from "semantic-ui-react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import { IPlayer } from "../../containers/MakeTeam/types";
import ItemTypes from "../Position/ItemTypes";
import playerImg from "../../images/christian.jpg";

export interface IProps {
  player: IPlayer;
  onDropInPosition: (player: IPlayer, positionIndex: number) => void;
  onClick: (player: IPlayer) => void;
}

export default function Player({ player, onDropInPosition, onClick }: IProps) {
  const [collectedProps, drag] = useDrag({
    item: { player, type: ItemTypes.POSITION },
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
      <Label as="a" onClick={handleOnClick} image>
        <img src={playerImg} />
        {`${player.lastName}, ${player.firstName}`}
        <Label.Detail>{player.number}</Label.Detail>
      </Label>
    </div>
  );
}
