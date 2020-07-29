import React from "react";
import styled from "@emotion/styled";
import { useDragLayer } from "react-dnd";

import snapToGrid from "../FieldEdit/snapToGrid";

import { ITEM_TYPE as POSITION_ITEM_TYPE } from "../PositionDrag";
import PositionStatic from "../PositionStatic";

interface IProps {
  width: number;
  height: number;
}

// A layer on top of the other positions to show dragging previews. These
// previews only lives when we are in dragging state.
export default function FieldDragLayer({ width, height }: IProps) {
  const { itemType, isDragging, item, diff } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    diff: monitor.getDifferenceFromInitialOffset(),
  }));

  if (!isDragging || itemType !== POSITION_ITEM_TYPE || !width || !height) {
    return null;
  }

  const diffx = ((diff?.x || 0) / width) * 100;
  const diffy = ((diff?.y || 0) / height) * 100;
  const x = Math.round(item.position.x + diffx);
  const y = Math.round(item.position.y + diffy);
  const snapped = snapToGrid(x, y);

  return (
    <Layer>
      {item && <PositionStatic position={{ ...item.position, ...snapped }} />}
    </Layer>
  );
}

const Layer = styled.div`
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
