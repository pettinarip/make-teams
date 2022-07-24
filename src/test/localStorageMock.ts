import { QUERY_KEY as LAYOUT_QUERY_KEY } from "../dal/layout/useGetLayouts";
import { QUERY_KEY as PLAYER_QUERY_KEY } from "../dal/player/useGetPlayers";
import { playersFixture } from "../graphql/queries/fixtures/players";
import { layoutsFixture } from "../graphql/queries/fixtures/layouts";

const initialStore = {
  [PLAYER_QUERY_KEY]: [...playersFixture],
  [LAYOUT_QUERY_KEY]: [...layoutsFixture.listCustomLayouts.items],
};

let store: Record<string, any> = {
  ...initialStore,
};

Storage.prototype.reset = jest.fn(() => {
  store = { ...initialStore };
});

Storage.prototype.clear = jest.fn(() => {
  store = {};
});

Storage.prototype.getItem = jest.fn((key: string) => {
  return store[key];
});

Storage.prototype.setItem = jest.fn((key: string, value: any) => {
  store[key] = String(value);
});

Storage.prototype.removeItem = jest.fn((key: string) => {
  delete store[key];
});
