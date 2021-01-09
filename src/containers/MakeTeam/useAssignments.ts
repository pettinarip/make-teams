import { useState, useEffect } from "react";
import produce from "immer";

import { IPlayer, IPosition } from "./types";

interface IReturn {
  assignments: Array<IPosition>;
  assign: (player: IPlayer, positionIndex?: number) => void;
  unassign: (positionIndex: number) => void;
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
          // Check if the player was not in another position. If so, then
          // unassign it from there
          const prevPositionIndex = assignments.findIndex(
            (p) => p?.player?.id === player.id
          );
          if (prevPositionIndex > -1) {
            delete positions[prevPositionIndex].player;
          }

          const prevPlayer = positions[positionIndex!].player;

          // The actual assignment
          positions[positionIndex!].player = player;

          // If there is already a player in the newer position then toggle the
          // players
          if (prevPlayer && prevPositionIndex > -1) {
            positions[prevPositionIndex].player = prevPlayer;
          }
        })
      );
    }
  }

  function unassign(positionIndex: number) {
    setAssignments(
      produce((positions: Array<IPosition>) => {
        delete positions[positionIndex].player;
      })
    );
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

  return { assignments, assign, unassign, toggle, reset };
}
