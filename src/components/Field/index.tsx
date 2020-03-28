import React from "react";
import styled from "@emotion/styled";

import { IPosition } from "../../containers/MakeTeam/types";

import Position from "../Position";

export interface IProps {
  positions: Array<IPosition>;
  onPositionDropInPosition: (
    positionDragged: IPosition,
    positionDropped: IPosition
  ) => void;
}

export default function Field(props: IProps) {
  return (
    <FieldWrapper>
      {props.positions.map(position => (
        <Position
          key={position.id}
          position={position}
          onPositionDropInPosition={props.onPositionDropInPosition}
        />
      ))}
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  background-color: lightgreen;
`;
