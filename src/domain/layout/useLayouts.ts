import { useMemo } from "react";

import { ILayout } from "../../containers/MakeTeam/types";
import useGetLayouts from "../../dal/layout/useGetLayouts";

export default function useLayouts() {
  const { data: layouts = [], ...rest } = useGetLayouts();

  const sortedLayouts = useMemo(() => {
    // Sort layouts by `createdAt` date
    const sorted = layouts.sort(sortByCreatedAt);

    // Sort each layout positions by the Y position
    return sorted.map(sortByPositionY);
  }, [layouts]);

  return { layouts: sortedLayouts, ...rest };
}

function sortByCreatedAt(a: ILayout, b: ILayout): number {
  return a.createdAt.localeCompare(b.createdAt);
}

function sortByPositionY(layout: ILayout): ILayout {
  const { positions, ...rest } = layout;
  return {
    ...rest,
    positions: [...positions].sort((a, b) => b.y - a.y),
  };
}
