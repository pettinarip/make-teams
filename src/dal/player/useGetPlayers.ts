import { useQuery, UseQueryResult } from "react-query";

import { Player as IPlayer } from "../../graphql/API";
import * as PlayerLocalStorage from "../../localStorage/player";

export const QUERY_KEY = "players";

export default function useGetPlayers(): UseQueryResult<Array<IPlayer>> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<IPlayer>> => {
      return PlayerLocalStorage.read();
    }
  );
}
