import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IReactQuery } from "../types";
import { listLayouts } from "../queries";
import { ILayout } from "../../containers/MakeTeam/types";

export default function useGetLayouts(): IReactQuery<Array<ILayout>> {
  return useQuery(
    "layouts",
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
