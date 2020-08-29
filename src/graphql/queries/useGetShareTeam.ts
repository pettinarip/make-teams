import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { QueryResult } from "react-query/types";
import omit from "lodash.omit";

import { getShareLink } from "../queries";
import { IShareTeam, IPosition } from "../../containers/MakeTeam/types";

export const QUERY_KEY = "shareTeam";

export default function useGetShareTeam(id?: string): QueryResult<IShareTeam> {
  return useQuery(
    QUERY_KEY,
    async (): Promise<IShareTeam> => {
      const response = (await API.graphql({
        ...graphqlOperation(getShareLink, { id }),
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
      })) as any;

      return {
        ...response.data.getShareLink,
        positions: response.data.getShareLink.positions.map(
          (position: IPosition) => {
            // TODO: try to fix this imp later. For some reason, graphql or
            // amplify send all the `ShareLinkPlayerInput` fields in null when the
            // `position.player` field is null, instead of just send
            // `position.player === null`
            if (!position.player?.id) {
              return omit(position, "player");
            }

            return position;
          }
        ),
      };
    },
    {
      enabled: id !== "",
    }
  );
}
