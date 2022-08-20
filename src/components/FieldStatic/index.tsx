import React from "react";

import Field from "../Field";

import {
  IPlayer,
  IPosition,
  IShareLinkPosition,
} from "../../containers/MakeTeam/types";
import PositionDnD from "../PositionDnD";
import PositionStatic from "../PositionStatic";
import PositionDrop from "../PositionDrop";
import useDimensions from "../../hooks/useDimensions";

interface IProps {
  loading?: boolean;
  readonly?: boolean;
  showNames?: boolean;
  positions: Array<IPosition | IShareLinkPosition>;
  highlight?: boolean;
  onPlayerDropInPosition?: (player: IPlayer, positionIndex: number) => void;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
  onPositionClick?: (positionIndex: number) => void;
  onPositionRemove?: (positionIndex: number) => void;
}

export default function FieldStatic(props: IProps) {
  const [ref, dimensions] = useDimensions<HTMLDivElement>();
  const { width, height } = dimensions;

  return (
    <Field ref={ref} loading={props.loading}>
      {width &&
        height &&
        props.positions.map((position, index) => {
          const commonProps = {
            key: index,
            position,
            style: {
              x: (position.x / 100) * width,
              y: (position.y / 100) * height,
            },
            showName: props.showNames,
            isActive: props.highlight,
          };

          return props.readonly ? (
            <PositionStatic {...commonProps} />
          ) : position.player ? (
            <PositionDnD
              index={index}
              showRemoveButton
              onPositionDrop={(index, positionIndex) =>
                props.onPositionDropInPosition(index, positionIndex)
              }
              onPlayerDrop={props.onPlayerDropInPosition}
              onPositionClick={props.onPositionClick}
              onRemoveClick={() => {
                if (props.onPositionRemove) {
                  props.onPositionRemove(index);
                }
              }}
              cursor="pointer"
              {...commonProps}
            />
          ) : (
            <PositionDrop
              index={index}
              onClick={props.onPositionClick}
              onPositionDrop={(index, positionIndex) =>
                props.onPositionDropInPosition(index, positionIndex)
              }
              onPlayerDrop={props.onPlayerDropInPosition}
              {...commonProps}
            />
          );
        })}
    </Field>
  );
}
