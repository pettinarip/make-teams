import React, { useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionDrag, { ITEM_TYPE, IDragPosition } from "../PositionDrag";
import Field from "../Field";

interface IProps {
  positions: Array<IPosition>;
  onPositionChange: (index: number, position: IPosition) => void;
}

export default function FieldEdit(props: IProps) {
  const dropArea = useRef<HTMLDivElement>();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: IDragPosition, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const dropWidth = dropArea?.current?.clientWidth || 0;
      const dropHeight = dropArea?.current?.clientHeight || 0;
      const x = Math.round(item.position.x + (delta.x / dropWidth) * 100);
      const y = Math.round(item.position.y + (delta.y / dropHeight) * 100);

      props.onPositionChange(item.index, { x, y });
      return undefined;
    },
  });

  return (
    <Field ref={composeRefs(drop, dropArea) as (arg: HTMLDivElement) => void}>
      {props.positions.map((position, index) => (
        <PositionDrag key={index} index={index} position={position} />
      ))}
    </Field>
  );
}
