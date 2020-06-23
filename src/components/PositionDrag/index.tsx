import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import { IPosition } from "../../containers/MakeTeam/types";
import Position from "../Position";

export const ITEM_TYPE = "positionDrag";

export interface IProps {
  index: number;
  position: IPosition;
}

export interface IDragPosition {
  index: number;
  x: number;
  y: number;
  type: string;
}

export default function PositionDrag({
  index,
  position,
  ...restProps
}: IProps) {
  const dragPosition: IDragPosition = {
    index,
    x: position.x,
    y: position.y,
    type: ITEM_TYPE,
  };
  const [{ isDragging }, drag] = useDrag({
    item: dragPosition,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return <div ref={drag} />;
  }

  return <Position ref={drag} position={position} {...restProps} />;
}
