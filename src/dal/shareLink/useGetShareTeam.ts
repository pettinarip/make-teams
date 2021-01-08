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
      return fetchShareTeam(id!);
    },
    {
      enabled: !!id,
    }
  );
}

export async function fetchShareTeam(id: string): Promise<IShareTeam> {
  const response = await sdk.ShareLink({ id });
  return response.shareLink!;
}