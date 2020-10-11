import { useMutation, queryCache } from "react-query";

import { IPlayer } from "../../containers/MakeTeam/types";
import { DeletePlayerMutationVariables } from "../../graphql/API";
import { QUERY_KEY } from "./useGetPlayers";
import sdk from "../../graphql/sdk";

export default function useRemovePlayer() {
  return useMutation<boolean, Error, DeletePlayerMutationVariables>(
    async (player): Promise<boolean> => {
      const response = await sdk.DeletePlayer(player);
      return response.deletePlayer;
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (player) => {
        queryCache.cancelQueries(QUERY_KEY);

        const previousValue = queryCache.getQueryData(QUERY_KEY);

        queryCache.setQueryData(
          QUERY_KEY,
          (players: Array<IPlayer> | undefined) => {
            if (!players) return [];
            return players.filter((p) => p.id !== player.id);
          }
        );

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (__err, __variables, previousValue) => {
        // TODO: we should show an error global message to the user
        queryCache.setQueryData(QUERY_KEY, previousValue);
      },
      // After success or failure, refetch the todos query
      onSettled: () => {
        // TODO: we should show a success global message to the user
        queryCache.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
