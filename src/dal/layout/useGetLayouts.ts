import { useQuery, UseQueryResult } from "react-query";

import { ILayout } from "../../containers/MakeTeam/types";
import * as LayoutLocalStorage from "../../localStorage/layout";

export const QUERY_KEY = "layouts";

export default function useGetLayouts(): UseQueryResult<Array<ILayout>> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<Array<ILayout>> => {
      return LayoutLocalStorage.read();
    }
  );
}
