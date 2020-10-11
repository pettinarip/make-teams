import { useQuery } from "react-query";
import { QueryResult } from "react-query/types";

import { IShareTeam } from "../../containers/MakeTeam/types";
import sdk from "../../graphql/sdk";

export const QUERY_KEY = "shareTeam";

export default function useGetShareTeam(
  id: string | undefined
): QueryResult<IShareTeam | undefined | null> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<IShareTeam | undefined | null> => {
      const response = await sdk.ShareLink({ id: id! });
      return response.shareLink;
    },
    {
      enabled: !!id,
    }
  );
}
