import { useMutation, queryCache } from "react-query";

import { CreateLayoutMutationVariables } from "../../graphql/API";
import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";

export default function useAddNewLayout() {
  return useMutation<ILayout, Error, CreateLayoutMutationVariables>(
    async (layout): Promise<ILayout> => {
      const response = await sdk.CreateLayout(layout);
      return response.createCustomLayout as ILayout;
    },
    {
      onSuccess: () => {
        // TODO: we should show a success global message to the user
        return queryCache.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
