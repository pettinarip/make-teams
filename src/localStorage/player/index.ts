import * as ls from "local-storage";

import { IPlayer } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "../../dal/player/useGetPlayers";
import {
  CreatePlayerMutationVariables,
  EditPlayerMutationVariables,
} from "../../graphql/API";

export function create(player: CreatePlayerMutationVariables): IPlayer {
  const players = read();
  const newPlayer = { ...player, id: (players.length + 1).toString() };
  ls.set(QUERY_KEY, [...players, newPlayer]);
  return player as IPlayer;
}

export function edit(player: EditPlayerMutationVariables) {
  const players = read();
  const index = players.findIndex((p) => p.id === player.id);
  if (index > -1) {
    ls.set(QUERY_KEY, [
      ...players.slice(0, index),
      player,
      ...players.slice(index + 1),
    ]);
  }
}

export function read(): Array<IPlayer> {
  return ls.get<Array<IPlayer>>(QUERY_KEY) || [];
}

export function remove(id: string) {
  const players = read();
  ls.set(
    QUERY_KEY,
    players.filter((player) => player.id !== id)
  );
}
