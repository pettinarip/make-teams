import { useState, useEffect } from "react";
import produce from "immer";

import { IPosition } from "./types";
import { Player as IPlayer } from "../../graphql/API";

interface IReturn {
  assignments: Array<IPosition>;
  assign: (player: IPlayer, positionIndex?: number) => void;
  toggle: (positionAIndex: number, positionBIndex: number) => void;
  reset: () => void;
}

export default function useAssignments(
  positions: Array<IPosition> = []
): IReturn {
  const [assignments, setAssignments] = useState<Array<IPosition>>([]);

  useEffect(() => {
    setAssignments(positions);
  }, [positions]);

  function assign(player: IPlayer, positionIndex?: number) {
    // If no position index is given, we add it on the first position available
    if (typeof positionIndex === "undefined") {
      positionIndex = assignments.findIndex((p) => !p.player);
    }

    if (positionIndex > -1) {
      setAssignments(
        produce((positions: Array<IPosition>) => {
          positions[positionIndex as number].player = player;
        })
      );
    }
  }

  function toggle(positionAIndex: number, positionBIndex: number) {
    setAssignments(
      produce((positions: Array<IPosition>) => {
        const playerDropped = positions[positionBIndex].player;
        const playerDragged = positions[positionAIndex].player;
        positions[positionBIndex].player = playerDragged;
        positions[positionAIndex].player = playerDropped;
      })
    );
  }

  function reset() {
    setAssignments(positions);
  }

  return { assignments, assign, toggle, reset };
}
