import { useMutation, useQueryClient } from "react-query";

import {
  CreateLayoutMutation,
  CreateLayoutMutationVariables,
} from "../../graphql/API";
import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as LayoutLocalStorage from "../../localStorage/layout";

export default function useAddNewLayout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    CreateLayoutMutation | ILayout,
    Error,
    CreateLayoutMutationVariables
  >(
    async (layout): Promise<CreateLayoutMutation | ILayout> => {
      if (user) {
        return sdk.CreateLayout(layout);
      } else {
        return LayoutLocalStorage.create(layout);
      }
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
