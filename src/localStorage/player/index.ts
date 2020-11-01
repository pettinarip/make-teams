import * as ls from "local-storage";

import { IPlayer } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "../../dal/player/useGetPlayers";
import { CreatePlayerMutationVariables } from "../../graphql/API";

export function create(player: CreatePlayerMutationVariables): IPlayer {
  const players = ls.get<Array<IPlayer>>(QUERY_KEY) || []
  const newPlayer = {...player, id: (players.length + 1).toString()}
  ls.set(QUERY_KEY, [...players, newPlayer])
  return player as IPlayer;
}

export function read(): Array<IPlayer> {
  return ls.get<Array<IPlayer>>(QUERY_KEY) || []
}

export function remove(id: string) {
  const players = ls.get<Array<IPlayer>>(QUERY_KEY) || []
  ls.set(QUERY_KEY, players.filter(player => player.id !== id))
}