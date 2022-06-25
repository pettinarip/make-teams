import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import {
  IPosition,
  IShareLinkPosition,
  ItemType,
} from "../../containers/MakeTeam/types";
import PositionDrop, { IProps as IPositionDropProps } from "../PositionDrop";

export interface IProps extends IPositionDropProps {
  index: number;
  position: IPosition | IShareLinkPosition;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
  onPositionClick?: (positionIndex: number) => void;
}

export interface IDragPosition {
  index: number;
  position: IPosition | IShareLinkPosition;
}

export default function PositionDnD({
  index,
  position,
  onPositionDropInPosition,
  onPositionClick,
  ...restProps
}: IProps) {
  const dragPosition: IDragPosition = {
    index,
    position,
  };

  const [, drag] = useDrag(() => ({
    type: ItemType.POSITION,
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
  }));

  return (
    <PositionDrop
      ref={drag}
      index={index}
      position={position}
      onClick={onPositionClick}
      {...restProps}
    />
  );
}
