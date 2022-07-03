import React from "react";

import {
  IPosition,
  IShareLinkPosition,
  ItemType,
} from "../../containers/MakeTeam/types";
import { useDrag } from "../../contexts/dnd";
import PositionDrop, { IProps as IPositionDropProps } from "../PositionDrop";

export interface IProps extends IPositionDropProps {
  index: number;
  position: IPosition | IShareLinkPosition;
  onPositionClick?: (positionIndex: number) => void;
}

export default function PositionDnD({
  index,
  position,
  onPositionClick,
  ...restProps
}: IProps) {
  const { x, y, bind } = useDrag({
    type: ItemType.POSITION,
  });

  return (
    <PositionDrop
      {...bind(index)}
      // @ts-ignore
      style={{ x, y, touchAction: "none" }}
      index={index}
      position={position}
      onClick={onPositionClick}
      {...restProps}
    />
  );
}
