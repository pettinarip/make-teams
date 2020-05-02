import { useMemo } from "react";

import { ILayout } from "../../containers/MakeTeam/types";
import useGetLayouts from "../../graphql/queries/useGetLayouts";

export default function useLayouts() {
  const { data: layouts = [], ...rest } = useGetLayouts();

  const sortedLayouts = useMemo(() => {
    return layouts.map(sortByPositionY);
  }, [layouts]);

  return { layouts: sortedLayouts, ...rest };
}

function sortByPositionY(layout: ILayout): ILayout {
  const { positions, ...rest } = layout;
  return {
    ...rest,
    positions: [...positions].sort((a, b) => b.y - a.y),
  };
}
