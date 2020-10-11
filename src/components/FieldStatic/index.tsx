import React from "react";

import Field from "../Field";

import { IPosition, IShareLinkPosition } from "../../containers/MakeTeam/types";
import PositionDnD from "../PositionDnD";
import PositionStatic from "../PositionStatic";
import PositionDrop from "../PositionDrop";

interface IProps {
  loading?: boolean;
  readonly?: boolean;
  showNames?: boolean;
  positions: Array<IPosition | IShareLinkPosition>;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export default function FieldStatic(props: IProps) {
  return (
    <Field loading={props.loading}>
      {props.positions.map((position, index) => {
        const commonProps = {
          key: index,
          position,
          showName: props.showNames,
        };

        return props.readonly ? (
          <PositionStatic {...commonProps} />
        ) : position.player ? (
          <PositionDnD
            index={index}
            onPositionDropInPosition={props.onPositionDropInPosition}
            {...commonProps}
          />
        ) : (
          <PositionDrop index={index} {...commonProps} />
        );
      })}
    </Field>
  );
}
