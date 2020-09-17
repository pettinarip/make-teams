import { useQuery } from "react-query";
import { QueryResult } from "react-query/types";

import sdk from "../../graphql/sdk";
import { Player } from "../../graphql/API";

export const QUERY_KEY = "players";

export default function useGetPlayers(user: any): QueryResult<Array<Player>> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<Player>> => {
      const response = await sdk.Players();
      return response.players as Array<Player>;
    },
    {
      enabled: !!user,
    }
  );
}
