import { useQuery, UseQueryResult } from "react-query";

import { ILayout } from "../../containers/MakeTeam/types";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as LayoutLocalStorage from '../../localStorage/layout'

export const QUERY_KEY = "layouts";

export default function useGetLayouts(): UseQueryResult<Array<ILayout>> {
  const { user } = useAuth();

  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<ILayout>> => {
      const response = await sdk.ListLayouts();

      const layouts = (response.layouts || []) as Array<ILayout>;

      let customLayouts;
      if (user) {
        customLayouts = (response.customLayouts || []).map(
          (layout): ILayout => ({
            ...layout,
            isCustom: true,
          })
        );
      } else {
        customLayouts = LayoutLocalStorage.read()
      }

      return layouts.concat(customLayouts);
    }
  );
}
