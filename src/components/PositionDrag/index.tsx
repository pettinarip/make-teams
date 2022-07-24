import React from "react";

import { IPosition, ItemType } from "../../containers/MakeTeam/types";
import { useDrag } from "../../contexts/dnd";
import PositionStatic, { IProps as IStaticProps } from "../PositionStatic";

export interface IProps extends IStaticProps {
  index: number;
  position: IPosition;
}

export default function PositionDrag({
  index,
  style,
  position,
  ...restProps
}: IProps) {
  const { x, y, bind } = useDrag({
    x: style.x,
    y: style.y,
    type: ItemType.POSITION,
  });

  // Just to be sure that we don't see any other thing while dragging the
  // position. Remember that we are showing the FieldDragLayer when we are
  // performing a drag
  // if (isDragging) {
  //   return null;
  // }

  return (
    <PositionStatic
      {...bind(index, position)}
      // @ts-ignore
      style={{ x, y, touchAction: "none" }}
      position={position}
      {...restProps}
    />
  );
}
