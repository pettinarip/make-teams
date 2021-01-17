import { useQuery, UseQueryResult } from "react-query";

import sdk from "../../graphql/sdk";
import { Player as IPlayer } from "../../graphql/API";
import { useAuth } from "../../contexts/auth";
import * as PlayerLocalStorage from "../../localStorage/player";

export const QUERY_KEY = "players";

export default function useGetPlayers(): UseQueryResult<Array<IPlayer>> {
  const { user } = useAuth();

  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<IPlayer>> => {
      if (user) {
        const response = await sdk.Players();
        return response.players as Array<IPlayer>;
      } else {
        return PlayerLocalStorage.read();
      }
    }
  );
}
