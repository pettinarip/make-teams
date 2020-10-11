import { useQuery } from "react-query";
import { QueryResult } from "react-query/types";

import { ILayout } from "../../containers/MakeTeam/types";
import sdk from "../../graphql/sdk";

export const QUERY_KEY = "layouts";

export default function useGetLayouts(): QueryResult<Array<ILayout>> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<ILayout>> => {
      const response = await sdk.ListLayouts();

      const layouts = (response.layouts || []) as Array<ILayout>;

      const customLayouts = (response.customLayouts || []).map(
        (layout): ILayout => ({
          ...layout,
          isCustom: true,
        })
      );

      return layouts.concat(customLayouts);
    }
  );
}
