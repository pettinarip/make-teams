import React, { useRef, useState, useCallback } from "react";
import { useDrop, XYCoord } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";
import produce from "immer";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionDrag, { ITEM_TYPE, IDragPosition } from "../PositionDrag";
import initialFormation from "./initialFormation";
import Field from "../Field";

interface IProps {}

export default function FieldEdit(__props: IProps) {
  const [newPositions, setNewPositions] = useState<Array<IPosition>>(
    initialFormation()
  );

  const dropArea = useRef<HTMLDivElement>();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: IDragPosition, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const dropWidth = dropArea?.current?.clientWidth || 0;
      const dropHeight = dropArea?.current?.clientHeight || 0;
      const x = Math.round(item.position.x + (delta.x / dropWidth) * 100);
      const y = Math.round(item.position.y + (delta.y / dropHeight) * 100);

      updatePositions(item.index, { x, y });
      return undefined;
    },
  });

  const updatePositions = useCallback((index, position) => {
    setNewPositions(
      produce((positions: Array<IPosition>) => {
        positions[index].x = position.x;
        positions[index].y = position.y;
      })
    );
  }, []);

  return (
    <Field ref={composeRefs(drop, dropArea) as (arg: HTMLDivElement) => void}>
      {newPositions.map((position, index) => (
        <PositionDrag key={index} index={index} position={position} />
      ))}
    </Field>
  );
}
