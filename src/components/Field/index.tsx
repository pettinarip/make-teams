import React from "react";
import styled from "@emotion/styled";

import { IPosition } from "../../containers/MakeTeam/types";

import PositionDnD from "../PositionDnD";
import Position from "../Position";

export const ID_ATTR = "field";

export interface IProps {
  readonly?: boolean;
  showNames?: boolean;
  positions: Array<IPosition>;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export default function Field(props: IProps) {
  return (
    <FieldWrapper id={ID_ATTR} data-testid={ID_ATTR}>
      <Positions>
        {props.positions.map((position, index) => {
          const commonProps = {
            position,
            showName: props.showNames,
          };

          return props.readonly ? (
            <Position {...commonProps} />
          ) : (
            <PositionDnD
              key={index}
              index={index}
              onPositionDropInPosition={props.onPositionDropInPosition}
              {...commonProps}
            />
          );
        })}
      </Positions>
    </FieldWrapper>
  );
}

// The bottom padding is to have a safe space to allocate players names
const FieldWrapper = styled.div`
  background-color: lightgreen;
  padding-bottom: 10px;
`;

const Positions = styled.div`
  position: relative;
  height: 500px;
`;
