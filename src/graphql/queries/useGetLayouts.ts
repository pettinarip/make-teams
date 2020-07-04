import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";
import { QueryResult } from "react-query/types";

import { listLayouts } from "../queries";
import { ILayout } from "../../containers/MakeTeam/types";

export default function useGetLayouts(user: any): QueryResult<Array<ILayout>> {
  return useQuery(
    ["layouts", user],
    async (): Promise<Array<ILayout>> => {
      const response = (await API.graphql(
        graphqlOperation(listLayouts)
      )) as any;

      const layouts = response.data.listLayouts.items;

      const customLayouts = response.data.listCustomLayouts.items.map(
        (layout: any) => ({
          ...layout,
          isCustom: true,
        })
      );

      return layouts.concat(customLayouts);
    },
    {
      enabled: !!user,
    }
  );
}
