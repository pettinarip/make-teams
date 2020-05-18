import React from "react";
import { useDrop, useDrag, DragSourceMonitor } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition } from "../../containers/MakeTeam/types";
import ItemTypes from "./ItemTypes";
import Position from "../Position";

export interface IProps {
  index: number;
  position: IPosition;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export default function PositionDnD({
  index,
  position,
  onPositionDropInPosition,
}: IProps) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.POSITION,
    drop: () => ({ index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [, drag] = useDrag({
    item: { index, type: ItemTypes.POSITION },
    end: (item: { index: number } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (index > -1 && dropResult && dropResult.index > -1) {
        onPositionDropInPosition(index, dropResult.index);
      }
    },
    collect: () => ({}),
  });

  const isActive = canDrop && isOver;

  return (
    <Position
      ref={composeRefs(drag, drop) as (arg: HTMLDivElement) => void}
      position={position}
      isActive={isActive}
    />
  );
}
