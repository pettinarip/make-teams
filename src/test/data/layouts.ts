import faker from "faker";

import {
  listLayouts as listLayoutsFixture,
  listCustomLayouts as listCustomLayoutsFixture,
} from "../../graphql/queries/fixtures/layouts";
import { ILayout, IPosition } from "../../containers/MakeTeam/types";

const listLayouts: Array<ILayout> = [...listLayoutsFixture];
let listCustomLayouts: Array<ILayout> = [...listCustomLayoutsFixture];

export function create({
  name,
  positions,
}: {
  name: string;
  positions: Array<IPosition>;
}): ILayout {
  const newLayout: ILayout = {
    id: faker.random.alphaNumeric(30),
    createdAt: new Date().toISOString(),
    isCustom: true,
    name,
    positions,
  };

  listCustomLayouts.push(newLayout);

  return newLayout;
}

export function remove({ id }: { id: string }): Array<ILayout> {
  const index = listCustomLayouts.findIndex((layout) => layout.id === id);
  listCustomLayouts.splice(index, 1);
  return listCustomLayouts;
}

export function reset() {
  listCustomLayouts = [...listCustomLayoutsFixture];
}

export function readLayouts(): Array<ILayout> {
  return listLayouts;
}

export function readCustomLayouts(): Array<ILayout> {
  return listCustomLayouts;
}

export function readResponse() {
  return {
    layouts: listLayouts,
    customLayouts: listCustomLayouts,
  };
}
