import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionStatic, { IProps as IStaticProps } from "../PositionStatic";

export const ITEM_TYPE = "positionDrag";

export interface IProps extends IStaticProps {
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

  const [{ isDragging }, drag, preview] = useDrag({
    item: dragPosition,
  });

  // Disable the default drag and drop preview image
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Just to be sure that we don't see any other thing while dragging the
  // position. Remember that we are showing the FieldDragLayer when we are
  // performing a drag
  if (isDragging) {
    return null;
  }

  return <PositionStatic ref={drag} position={position} {...restProps} />;
}
