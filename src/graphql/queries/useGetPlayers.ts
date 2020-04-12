import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IReactQuery } from "../types";
import { listPlayers } from "../queries";
import { IPlayer } from "../../containers/MakeTeam/types";

export default function useGetPlayers(): IReactQuery<Array<IPlayer>> {
  return useQuery(
    "players",
    async (): Promise<Array<IPlayer>> => {
      const response = (await API.graphql(
        graphqlOperation(listPlayers, { limit: 20 })
      )) as any;

      return response.data.listPlayers.items;
    }
  );
}
