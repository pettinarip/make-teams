import { useQuery } from "react-query";
import { QueryResult } from "react-query/types";

import sdk from "../../graphql/sdk";
import { Player as IPlayer } from "../../graphql/API";
import { IUser } from "../user/types";

export const QUERY_KEY = "players";

export default function useGetPlayers(user: IUser | undefined): QueryResult<Array<IPlayer>> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<IPlayer>> => {
      const response = await sdk.Players();
      return response.players as Array<IPlayer>;
    },
    {
      enabled: !!user,
    }
  );
}
