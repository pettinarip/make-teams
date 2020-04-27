import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IReactQuery } from "../types";
import { listLayouts } from "../queries";
import { ILayout } from "../../containers/MakeTeam/types";
import useAuth from "../../components/ProtectedRoute/useAuth";

export default function useGetLayouts(): IReactQuery<Array<ILayout>> {
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
