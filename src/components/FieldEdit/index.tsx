import React, { useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";
import produce from "immer";
import clamp from "lodash.clamp";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionDrag, {
  ITEM_TYPE as POSITION_DRAG_ITEM_TYPE,
  IDragPosition,
} from "../PositionDrag";
import Field from "../Field";
import FieldDragLayer from "../FieldDragLayer";
import useDimensions from "../../hooks/useDimensions";
import snapToGrid from "./snapToGrid";
import FieldGrid, { IGridPosition } from "../FieldGrid";

interface IProps {
  positions: Array<IPosition>;
  onChange: (positions: Array<IPosition>) => void;
}

export default function FieldEdit(props: IProps) {
  const [dropArea, dimensions] = useDimensions();
  const [selectedPosition, setSelectedPosition] = useState<IPosition>();

  const [, drop] = useDrop({
    accept: POSITION_DRAG_ITEM_TYPE,
    drop: (item: IDragPosition, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

      // Calulate the new x and y positions in percentages
      const dropWidth = dropArea?.current?.clientWidth || 0;
      const dropHeight = dropArea?.current?.clientHeight || 0;
      const x = Math.round(item.position.x + (delta.x / dropWidth) * 100);
      const y = Math.round(item.position.y + (delta.y / dropHeight) * 100);
      const snapped = snapToGrid(x, y);

      // Snap the new positions to the grid
      updatePositions(item.index, {
        x: clamp(snapped.x, 0, 100),
        y: clamp(snapped.y, 0, 100),
      });
      return undefined;
    },
  });

  function updatePositions(index: number, position: IPosition) {
    const newPositions = produce(
      props.positions,
      (positions: Array<IPosition>) => {
        positions[index].x = position.x;
        positions[index].y = position.y;
      }
    );

    props.onChange(newPositions);
  }

  function handleGridPositionClick(gridPosition: IGridPosition) {
    const positionIndex = props.positions.indexOf(selectedPosition!);
    setSelectedPosition(undefined);
    updatePositions(positionIndex, { ...selectedPosition, ...gridPosition });
  }

  function handleGridClick() {
    setSelectedPosition(undefined);
  }

  function handlePositionClick(position: IPosition) {
    setSelectedPosition(position);
  }

  return (
    <Field ref={composeRefs(drop, dropArea) as (arg: HTMLDivElement) => void}>
      {props.positions.map((position, index) => (
        <PositionDrag
          key={index}
          index={index}
          position={position}
          onClick={() => handlePositionClick(position)}
          isActive={selectedPosition && selectedPosition === position}
          cursor="pointer"
          opacity={selectedPosition ? 0.6 : 1}
        />
      ))}
      <FieldGrid
        visible={!!selectedPosition}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleGridPositionClick}
        onGridClick={handleGridClick}
      />
      <FieldDragLayer width={dimensions.width} height={dimensions.height} />
    </Field>
  );
}
