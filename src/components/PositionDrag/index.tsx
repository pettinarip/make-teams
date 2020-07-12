import React from "react";
import { useDrag } from "react-dnd";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionStatic from "../PositionStatic";

export const ITEM_TYPE = "positionDrag";

export interface IProps {
  index: number;
  position: IPosition;
}

export interface IDragPosition {
  index: number;
  position: IPosition;
  type: string;
}

export default function PositionDrag({
  index,
  position,
  ...restProps
}: IProps) {
  const dragPosition: IDragPosition = {
    index,
    position,
    type: ITEM_TYPE,
  };
  const [, drag] = useDrag({
    item: dragPosition,
  });

  return <PositionStatic ref={drag} position={position} {...restProps} />;
}
