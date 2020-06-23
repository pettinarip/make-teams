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
  const dropArea = useRef();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: IDragPosition, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      if (dropArea.current) {
        const dropWidth = (dropArea.current as any).clientWidth;
        const dropHeight = (dropArea.current as any).clientHeight;
        const x = Math.round(item.x + (delta.x / dropWidth) * 100);
        const y = Math.round(item.y + (delta.y / dropHeight) * 100);
        props.onPositionChange(item.index, { x, y });
      }
      return;
    },
  });

  return (
    <div ref={composeRefs(drop, dropArea) as (arg: HTMLDivElement) => void}>
      <Field>
        <>
          {props.positions.map((position, index) => (
            <PositionDrag key={index} index={index} position={position} />
          ))}
        </>
      </Field>
    </div>
  );
}
