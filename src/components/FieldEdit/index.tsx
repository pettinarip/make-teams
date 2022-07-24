import React, { useState } from "react";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition, ItemType } from "../../containers/MakeTeam/types";
import PositionDrag from "../PositionDrag";
import Field from "../Field";
import useDimensions from "../../hooks/useDimensions";
import FieldGrid, { IGridPosition } from "../FieldGrid";
import { useDrop } from "../../contexts/dnd";

interface IProps {
  positions: Array<IPosition>;
  onChange: (index: number, position: IPosition) => void;
}

export default function FieldEdit({ positions, onChange }: IProps) {
  const [dropArea, dimensions] = useDimensions();
  const [selectedPosition, setSelectedPosition] = useState<IPosition>();

  const dropWidth = dropArea?.current?.clientWidth || 0;
  const dropHeight = dropArea?.current?.clientHeight || 0;

  const { ref: drop } = useDrop(
    {
      accept: [ItemType.POSITION],
      onDrop: (_type, { offset, args: [index] }) => {
        // Calulate the new x and y positions in percentages
        const x = (offset[0] / dropWidth) * 100;
        const y = (offset[1] / dropHeight) * 100;

        onChange(index, { x, y });
      },
    },
    [onChange]
  );

  function handleGridPositionClick(gridPosition: IGridPosition) {
    const positionIndex = positions.indexOf(selectedPosition!);
    setSelectedPosition(undefined);
    onChange(positionIndex, gridPosition);
  }

  function handleGridClick() {
    setSelectedPosition(undefined);
  }

  function handlePositionClick(position: IPosition) {
    setSelectedPosition(position);
  }

  return (
    <Field ref={composeRefs(drop, dropArea) as (arg: HTMLDivElement) => void}>
      {dropWidth &&
        dropHeight &&
        positions.map((position, index) => {
          const x = (position.x / 100) * dropWidth;
          const y = (position.y / 100) * dropHeight;

          return (
            <PositionDrag
              key={index}
              index={index}
              style={{ x, y }}
              position={position}
              onClick={() => handlePositionClick(position)}
              isActive={selectedPosition && selectedPosition === position}
              cursor="pointer"
              opacity={selectedPosition ? 0.6 : 1}
            />
          );
        })}
      <FieldGrid
        visible={!!selectedPosition}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleGridPositionClick}
        onGridClick={handleGridClick}
      />
    </Field>
  );
}
