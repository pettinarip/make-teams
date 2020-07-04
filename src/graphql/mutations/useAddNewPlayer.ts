import { useMutation, queryCache } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IPlayer } from "../../containers/MakeTeam/types";
import { createPlayer } from "../mutations";

export default function useAddNewPlayer() {
  return useMutation<any, Partial<IPlayer>>(
    async (player) => {
      await API.graphql(graphqlOperation(createPlayer, { input: player }));
    },
    {
      onSuccess: () => {
        return queryCache.invalidateQueries("players");
      },
    }
  );
}
