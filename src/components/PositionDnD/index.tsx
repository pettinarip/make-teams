import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import { IPosition } from "../../containers/MakeTeam/types";
import ItemTypes from "./ItemTypes";
import PositionDrop from "../PositionDrop";

export interface IProps {
  index: number;
  position: IPosition;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export interface IDragPosition {
  index: number;
  position: IPosition;
  type: string;
}

export default function PositionDnD({
  index,
  position,
  onPositionDropInPosition,
  ...restProps
}: IProps) {
  const dragPosition: IDragPosition = {
    index,
    position,
    type: ItemTypes.POSITION,
  };

  const [, drag] = useDrag({
    item: dragPosition,
    end: (
      __item: { index: number } | undefined,
      monitor: DragSourceMonitor
    ) => {
      const dropResult = monitor.getDropResult();
      if (index > -1 && dropResult?.index > -1) {
        onPositionDropInPosition(index, dropResult.index);
      }
    },
  });

  return (
    <PositionDrop ref={drag} index={index} position={position} {...restProps} />
  );
}
