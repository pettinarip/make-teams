import { useMutation, useQueryClient } from "react-query";

import { ILayout } from "../../containers/MakeTeam/types";
import { DeleteCustomLayoutMutationVariables } from "../../graphql/API";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as LayoutLocalStorage from "../../localStorage/layout";

export default function useRemoveLayout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, DeleteCustomLayoutMutationVariables>(
    async (layout): Promise<boolean> => {
      if (user) {
        const response = await sdk.DeleteCustomLayout(layout);
        return response.deleteCustomLayout;
      } else {
        LayoutLocalStorage.remove(layout.id);
        return true;
      }
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (layout) => {
        queryClient.cancelQueries(QUERY_KEY);

        const previousValue = queryClient.getQueryData(QUERY_KEY);

        queryClient.setQueryData(
          QUERY_KEY,
          (layouts: Array<ILayout> | undefined) => {
            if (!layouts) return [];
            return layouts.filter((l) => l.id !== layout.id);
          }
        );

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (__err, __variables, previousValue) => {
        // TODO: we should show an error global message to the user
        queryClient.setQueryData(QUERY_KEY, previousValue);
      },
      // After success or failure, refetch the todos query
      onSettled: () => {
        // TODO: we should show a success global message to the user
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
