import React, { forwardRef, Ref, useCallback } from "react";
import { useDrop } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition, IShareLinkPosition } from "../../containers/MakeTeam/types";
import PositionStatic, {
  IProps as IPositionStaticProps,
} from "../PositionStatic";
import ItemTypes from "../PositionDnD/ItemTypes";
import { ITEM_TYPE as PLAYER_ITEM_TYPE } from "../Player";

export const ITEM_TYPE = "positionDrop";

export interface IProps extends Omit<IPositionStaticProps, "onClick"> {
  index: number;
  position: IPosition | IShareLinkPosition;
  onClick?: (index: number) => void;
}

export interface IDropPosition {
  index: number;
  position: IPosition | IShareLinkPosition;
  type: string;
}

function PositionDrop(
  { index, position, onClick, ...restProps }: IProps,
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

  const handleClick = useCallback(() => {
    if (onClick) onClick(index);
  }, [onClick, index]);

  return (
    <PositionStatic
      ref={composeRefs(ref, drop) as () => void}
      position={position}
      isActive={isActive}
      onClick={handleClick}
      {...restProps}
    />
  );
}

export default forwardRef(PositionDrop);
