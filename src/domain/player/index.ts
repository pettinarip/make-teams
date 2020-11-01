import { IPlayer } from "../../containers/MakeTeam/types";

export const MAX_PLAYERS_AMOUNT = 24

export function hasReachedMaxNumber(players: Array<IPlayer>) {
  return players.length >= MAX_PLAYERS_AMOUNT
}