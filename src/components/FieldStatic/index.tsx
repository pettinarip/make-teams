import React from "react";

import Field from "../Field";

import { IPosition } from "../../containers/MakeTeam/types";
import PositionDnD from "../PositionDnD";
import PositionStatic from "../PositionStatic";

interface IProps {
  loading?: boolean;
  readonly?: boolean;
  showNames?: boolean;
  positions: Array<IPosition>;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export default function FieldStatic(props: IProps) {
  return (
    <Field loading={props.loading}>
      <>
        {props.positions.map((position, index) => {
          const commonProps = {
            position,
            showName: props.showNames,
          };

          return props.readonly ? (
            <PositionStatic {...commonProps} />
          ) : (
            <PositionDnD
              key={index}
              index={index}
              onPositionDropInPosition={props.onPositionDropInPosition}
              {...commonProps}
            />
          );
        })}
      </>
    </Field>
  );
}
