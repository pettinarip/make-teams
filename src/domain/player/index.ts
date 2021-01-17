import { IPlayer } from "../../containers/MakeTeam/types";

export function hasReachedMaxNumber(players: Array<IPlayer>) {
  const max = Number(process.env.NEXT_PUBLIC_MAX_PLAYERS_AMOUNT!);
  return players.length >= max;
}
