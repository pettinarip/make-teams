import React, { forwardRef, useCallback } from "react";
import composeRefs from "@seznam/compose-react-refs";

import {
  IPlayer,
  IPosition,
  IShareLinkPosition,
  ItemType,
} from "../../containers/MakeTeam/types";
import PositionStatic, {
  IProps as IPositionStaticProps,
} from "../PositionStatic";
import { useDrop } from "../../contexts/dnd";

export interface IProps
  extends Omit<IPositionStaticProps, "onClick" | "onDrop"> {
  index: number;
  position: IPosition | IShareLinkPosition;
  onClick?: (index: number) => void;
  onPlayerDrop?: (player: IPlayer, positionIndex: number) => void;
  onPositionDrop?: (draggedIndex: number, positionIndex: number) => void;
}

const PositionDrop = forwardRef<HTMLDivElement, IProps>(
  (
    {
      index,
      position,
      onClick,
      isActive,
      onPlayerDrop,
      onPositionDrop,
      ...restProps
    },
    ref
  ) => {
    const { ref: drop } = useDrop({
      accept: [ItemType.POSITION, ItemType.PLAYER],
      onDrop: (type, [item]) => {
        if (type === ItemType.PLAYER && onPlayerDrop) {
          onPlayerDrop(item as IPlayer, index);
        }

        if (type === ItemType.POSITION && onPositionDrop) {
          onPositionDrop(item as number, index);
        }
      },
    });

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
);

export default PositionDrop;
