import { useMutation, useQueryClient } from "react-query";

import { IPlayer } from "../../containers/MakeTeam/types";
import { DeletePlayerMutationVariables } from "../../graphql/API";
import { QUERY_KEY } from "./useGetPlayers";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as PlayerLocalStorage from "../../localStorage/player";

export default function useRemovePlayer() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, DeletePlayerMutationVariables>(
    async (player): Promise<boolean> => {
      if (user) {
        const response = await sdk.DeletePlayer(player);
        return response.deletePlayer;
      } else {
        PlayerLocalStorage.remove(player.id);
        return true;
      }
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (player) => {
        queryClient.cancelQueries(QUERY_KEY);

        const previousValue = queryClient.getQueryData(QUERY_KEY);

        queryClient.setQueryData(
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
        queryClient.setQueryData(QUERY_KEY, previousValue);
      },
      // After success or failure, refetch the todos query
      onSettled: () => {
        // TODO: we should show a success global message to the user
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
