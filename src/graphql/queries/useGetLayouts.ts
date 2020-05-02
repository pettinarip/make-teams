import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";
import { QueryResult } from "react-query/types";

import { listLayouts } from "../queries";
import { ILayout } from "../../containers/MakeTeam/types";
import useAuth from "../../components/ProtectedRoute/useAuth";

export default function useGetLayouts(): QueryResult<Array<ILayout>> {
  const { user = {} as any } = useAuth();

  return useQuery(
    user && ["layouts", user],
    async (): Promise<Array<ILayout>> => {
      const response = (await API.graphql(
        graphqlOperation(listLayouts)
      )) as any;

      return response.data.listLayouts.items.map((layout: any) => ({
        ...layout,
        positions: layout.positions.items,
      }));
    }
  );
}
