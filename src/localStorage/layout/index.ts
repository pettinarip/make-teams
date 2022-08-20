import * as ls from "local-storage";

import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "../../dal/layout/useGetLayouts";
import {
  CreateLayoutMutationVariables,
  EditCustomLayoutMutationVariables,
} from "../../graphql/API";

export function create(layout: CreateLayoutMutationVariables): ILayout {
  const layouts = read();
  const latestId = layouts.reduce((id, layout) => {
    const num = Number(layout.id);
    return num > id ? num : id;
  }, 0);

  ls.set(QUERY_KEY, [
    ...layouts,
    {
      ...layout,
      createdAt: new Date().getTime().toString(),
      isCustom: true,
      id: (latestId + 1).toString(),
    },
  ]);
  return layout as ILayout;
}

export function read(): Array<ILayout> {
  return ls.get<Array<ILayout>>(QUERY_KEY) || [];
}

export function remove(id: string) {
  const layouts = ls.get<Array<ILayout>>(QUERY_KEY) || [];
  ls.set(
    QUERY_KEY,
    layouts.filter((layout) => layout.id !== id)
  );
}

export function edit(layout: EditCustomLayoutMutationVariables) {
  try {
    const layouts = read();
    const index = layouts.findIndex((l) => l.id === layout.id);
    if (index > -1) {
      ls.set(QUERY_KEY, [
        ...layouts.slice(0, index),
        { ...layouts[index], ...layout },
        ...layouts.slice(index + 1),
      ]);
    }
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}
