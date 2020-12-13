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
  highlight?: boolean;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
  onPositionClick?: (positionIndex: number) => void;
  onPositionRemove: (positionIndex: number) => void;
}

export default function FieldStatic(props: IProps) {
  return (
    <Field loading={props.loading}>
      {props.positions.map((position, index) => {
        const commonProps = {
          key: index,
          position,
          showName: props.showNames,
          isActive: props.highlight,
        };

        return props.readonly ? (
          <PositionStatic {...commonProps} />
        ) : position.player ? (
          <PositionDnD
            index={index}
            onPositionDropInPosition={props.onPositionDropInPosition}
            onPositionClick={props.onPositionClick}
            onRemoveClick={() => props.onPositionRemove(index)}
            cursor="pointer"
            {...commonProps}
          />
        ) : (
          <PositionDrop
            index={index}
            onClick={props.onPositionClick}
            {...commonProps}
          />
        );
      })}
    </Field>
  );
}
