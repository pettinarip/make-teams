import React from "react";
import styled from "@emotion/styled";
import { useDrop, useDrag, DragSourceMonitor } from "react-dnd";
import { Label } from "semantic-ui-react";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition } from "../../containers/MakeTeam/types";
import ItemTypes from "./ItemTypes";

export interface IProps {
  position: IPosition;
  onPositionDropInPosition: (
    positionDragged: IPosition,
    positionDropped: IPosition
  ) => void;
}

export default function Position({
  position,
  onPositionDropInPosition
}: IProps) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.POSITION,
    drop: () => position,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const [collecedProps, drag] = useDrag({
    item: { position, type: ItemTypes.POSITION },
    end: (
      item: { position: IPosition } | undefined,
      monitor: DragSourceMonitor
    ) => {
      const positionDropped = monitor.getDropResult();
      if (position && positionDropped) {
        onPositionDropInPosition(position, positionDropped);
      }
    },
    collect: () => ({})
  });

  const isActive = canDrop && isOver;

  return (
    <PositionStyled
      ref={composeRefs(drag, drop) as (arg: HTMLDivElement) => void}
      x={position.x}
      y={position.y}
      isActive={isActive}
    >
      {position.player ? position.player.number : ""}
      {position.player && (
        <Label color="teal" floating>
          {position.player.number}
        </Label>
      )}
    </PositionStyled>
  );
}

type IStyledProps = {
  x: number;
  y: number;
  isActive: boolean;
};

const PositionStyled = styled.div<IStyledProps>(
  {
    position: "absolute",
    display: "inline-block",
    width: 40,
    height: 40,
    textAlign: "center",
    lineHeight: "40px",
    marginLeft: -20
  },
  props => ({
    left: `${props.x}%`,
    top: `${props.y}%`,
    backgroundColor: props.isActive ? "gray" : "lightgray",
    border: props.isActive ? "1px solid black" : "none"
  })
);
