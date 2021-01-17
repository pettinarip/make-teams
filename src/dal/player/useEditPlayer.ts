import { useMutation, useQueryClient } from "react-query";

import * as PlayerLocalStorage from "../../localStorage/player";

import { EditPlayerMutationVariables } from "../../graphql/API";
import { QUERY_KEY } from "./useGetPlayers";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";

export default function useEditPlayer() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, EditPlayerMutationVariables>(
    async (player): Promise<boolean> => {
      if (user) {
        const response = await sdk.EditPlayer(player);
        return response.editPlayer;
      } else {
        PlayerLocalStorage.edit(player);
        return true;
      }
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
