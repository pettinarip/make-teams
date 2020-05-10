import React from "react";
import styled from "@emotion/styled";

import { IPosition } from "../../containers/MakeTeam/types";

import Position from "../Position";

export interface IProps {
  positions: Array<IPosition>;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export default function Field(props: IProps) {
  return (
    <FieldWrapper data-testid="field">
      {props.positions.map((position, index) => (
        <Position
          key={index}
          index={index}
          position={position}
          onPositionDropInPosition={props.onPositionDropInPosition}
        />
      ))}
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div`
  position: relative;
  height: 500px;
  background-color: lightgreen;
`;
