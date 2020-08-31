import { useMutation, queryCache } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IPlayer } from "../../containers/MakeTeam/types";
import { deletePlayer } from "../mutations";
import { QUERY_KEY } from "../queries/useGetPlayers";

export default function useRemovePlayer() {
  return useMutation<any, Partial<IPlayer>>(
    async (player) => {
      await API.graphql(
        graphqlOperation(deletePlayer, { input: { id: player.id } })
      );
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
            if (!players) return;
            return players.filter((p) => p.id !== player.id);
          }
        );

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
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
