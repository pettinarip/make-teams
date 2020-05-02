/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useDrop, useDrag, DragSourceMonitor } from "react-dnd";
import { Label } from "semantic-ui-react";
import composeRefs from "@seznam/compose-react-refs";

import { IPosition } from "../../containers/MakeTeam/types";
import playerImg from "../../images/christian.jpg";
import ItemTypes from "./ItemTypes";

export interface IProps {
  index: number;
  position: IPosition;
  onPositionDropInPosition: (
    positionDraggedIndex: number,
    positionDroppedIndex: number
  ) => void;
}

export default function Position({
  index,
  position,
  onPositionDropInPosition,
}: IProps) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.POSITION,
    drop: () => ({ index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [, drag] = useDrag({
    item: { index, type: ItemTypes.POSITION },
    end: (item: { index: number } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (index > -1 && dropResult && dropResult.index > -1) {
        onPositionDropInPosition(index, dropResult.index);
      }
    },
    collect: () => ({}),
  });

  const isActive = canDrop && isOver;

  return (
    <Wrapper
      ref={composeRefs(drag, drop) as (arg: HTMLDivElement) => void}
      x={position.x}
      y={position.y}
    >
      <Img isActive={isActive}>
        {position.player ? (
          <img
            css={css`
              width: 100%;
            `}
            src={playerImg}
            alt=""
          />
        ) : (
          ""
        )}
      </Img>
      {position.player && (
        <Label color="teal" floating>
          {position.player.number}
        </Label>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ x: number; y: number }>(
  {
    position: "absolute",
    textAlign: "center",
    lineHeight: "40px",
    marginLeft: -20,
  },
  (props) => ({
    left: `${props.x}%`,
    top: `${props.y}%`,
  })
);

const Img = styled.div<{ isActive: boolean }>(
  {
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
  },
  (props) => ({
    backgroundColor: props.isActive ? "lightgray" : "white",
  })
);
