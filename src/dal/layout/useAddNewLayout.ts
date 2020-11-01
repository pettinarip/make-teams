import { useMutation, queryCache } from "react-query";

import { CreateLayoutMutationVariables } from "../../graphql/API";
import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as LayoutLocalStorage from '../../localStorage/layout'

export default function useAddNewLayout() {
  const { user } = useAuth();

  return useMutation<ILayout, Error, CreateLayoutMutationVariables>(
    async (layout): Promise<ILayout> => {
      if (user) {
        const response = await sdk.CreateLayout(layout);
        return response.createCustomLayout as ILayout;
      } else {
        return LayoutLocalStorage.create(layout)
      }
    },
    {
      onSuccess: () => {
        // TODO: we should show a success global message to the user
        return queryCache.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
