import React, { useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";
import produce from "immer";

import snapToGrid from "./snapToGrid";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionDrag, { ITEM_TYPE, IDragPosition } from "../PositionDrag";
import Field from "../Field";

interface IProps {
  positions: Array<IPosition>;
  onChange: (positions: Array<IPosition>) => void;
}

export default function FieldEdit(props: IProps) {
  const dropArea = useRef<HTMLDivElement>();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: IDragPosition, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

      // Calulate the new x and y positions in percentages
      const dropWidth = dropArea?.current?.clientWidth || 0;
      const dropHeight = dropArea?.current?.clientHeight || 0;
      const x = Math.round(item.position.x + (delta.x / dropWidth) * 100);
      const y = Math.round(item.position.y + (delta.y / dropHeight) * 100);

      // Snap the new positions to the grid
      updatePositions(item.index, snapToGrid(x, y));
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

  return (
    <Field ref={composeRefs(drop, dropArea) as (arg: HTMLDivElement) => void}>
      {props.positions.map((position, index) => (
        <PositionDrag key={index} index={index} position={position} />
      ))}
    </Field>
  );
}
