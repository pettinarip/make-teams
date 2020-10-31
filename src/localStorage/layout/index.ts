import * as ls from "local-storage";

import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "../../dal/layout/useGetLayouts";
import { CreateLayoutMutationVariables } from "../../graphql/API";

export function create(layout: CreateLayoutMutationVariables): ILayout {
  const layouts = ls.get<Array<ILayout>>(QUERY_KEY) || [];
  ls.set(QUERY_KEY, [
    ...layouts,
    {
      ...layout,
      createdAt: new Date().getTime().toString(),
      isCustom: true,
      id: (layouts.length + 1).toString(),
    },
  ]);
  return layout as ILayout;
}

export function read(): Array<ILayout> {
  return ls.get<Array<ILayout>>(QUERY_KEY) || [];
}
