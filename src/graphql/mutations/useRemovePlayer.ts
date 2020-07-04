import { useMutation, queryCache } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IPlayer } from "../../containers/MakeTeam/types";
import { deletePlayer } from "../mutations";

export default function useRemovePlayer() {
  return useMutation<any, Partial<IPlayer>>(
    async (player) => {
      await API.graphql(
        graphqlOperation(deletePlayer, { playerId: player.id })
      );
    },
    {
      onSuccess: () => {
        return queryCache.invalidateQueries("players");
      },
    }
  );
}
