import React from "react";
import styled from "@emotion/styled";
import { Label } from "semantic-ui-react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import { IPlayer } from "../../containers/MakeTeam/types";
import ItemTypes from "../Position/ItemTypes";

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
    }
  });

  function handleOnClick() {
    onClick(player);
  }

  return (
    <div ref={drag}>
      <LabelStyled as="a" onClick={handleOnClick}>
        {`${player.lastName}, ${player.firstName}`}
        <Label.Detail>{player.number}</Label.Detail>
      </LabelStyled>
    </div>
  );
}

const LabelStyled = styled(Label)`
  display: block !important;
`;
