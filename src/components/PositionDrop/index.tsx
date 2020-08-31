import React, { forwardRef, Ref } from "react";
import { useDrop } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionStatic from "../PositionStatic";
import ItemTypes from "../PositionDnD/ItemTypes";
import { ITEM_TYPE as PLAYER_ITEM_TYPE } from "../Player";

export const ITEM_TYPE = "positionDrop";

export interface IProps {
  index: number;
  position: IPosition;
}

export interface IDropPosition {
  index: number;
  position: IPosition;
  type: string;
}

function PositionDrop(
  { index, position, ...restProps }: IProps,
  ref: Ref<HTMLDivElement>
) {
  const dropPosition: IDropPosition = {
    index,
    position,
    type: ITEM_TYPE,
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [ItemTypes.POSITION, PLAYER_ITEM_TYPE],
    drop: () => dropPosition,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <PositionStatic
      ref={composeRefs(ref, drop) as () => void}
      position={position}
      isActive={isActive}
      {...restProps}
    />
  );
}

export default forwardRef(PositionDrop);
