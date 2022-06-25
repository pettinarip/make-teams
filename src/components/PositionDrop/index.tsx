import React, { forwardRef, Ref, useCallback } from "react";
import { useDrop } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";

import {
  IPosition,
  IShareLinkPosition,
  ItemType,
} from "../../containers/MakeTeam/types";
import PositionStatic, {
  IProps as IPositionStaticProps,
} from "../PositionStatic";

export interface IProps extends Omit<IPositionStaticProps, "onClick"> {
  index: number;
  position: IPosition | IShareLinkPosition;
  onClick?: (index: number) => void;
}

export interface IDropPosition {
  index: number;
  position: IPosition | IShareLinkPosition;
}

function PositionDrop(
  { index, position, onClick, ...restProps }: IProps,
  ref: Ref<HTMLDivElement>
) {
  const dropPosition: IDropPosition = {
    index,
    position,
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [ItemType.POSITION, ItemType.PLAYER],
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
