import { useMutation, queryCache } from "react-query";

import {
  CreatePlayerMutationVariables,
  Player as IPlayer,
} from "../../graphql/API";
import { QUERY_KEY } from "./useGetPlayers";
import sdk from "../../graphql/sdk";

export default function useAddNewPlayer() {
  return useMutation<IPlayer, Error, CreatePlayerMutationVariables>(
    async (player): Promise<IPlayer> => {
      const response = await sdk.CreatePlayer(player);
      return response.createPlayer as IPlayer;
    },
    {
      onSuccess: () => {
        return queryCache.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
