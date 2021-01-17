import { useMutation, useQueryClient } from "react-query";

import * as PlayerLocalStorage from "../../localStorage/player";

import {
  CreatePlayerMutationVariables,
  Player as IPlayer,
} from "../../graphql/API";
import { QUERY_KEY } from "./useGetPlayers";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";

export default function useAddNewPlayer() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<IPlayer, Error, CreatePlayerMutationVariables>(
    async (player): Promise<IPlayer> => {
      if (user) {
        const response = await sdk.CreatePlayer(player);
        return response.createPlayer as IPlayer;
      } else {
        return PlayerLocalStorage.create(player);
      }
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
