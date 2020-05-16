import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";
import { QueryResult } from "react-query/types";

import { getShareLink } from "../queries";
import { IShareTeam } from "../../containers/MakeTeam/types";

export default function useGetShareTeam(id?: string): QueryResult<IShareTeam> {
  return useQuery(
    id !== "" && ["shareTeam"],
    async (): Promise<IShareTeam> => {
      const response = (await API.graphql({
        ...graphqlOperation(getShareLink, { id }),
        authMode: "AWS_IAM" as any,
      })) as any;

      const shareTeam = response.data.getShareLink;

      return { ...shareTeam, positions: JSON.parse(shareTeam.positions) };
    }
  );
}
