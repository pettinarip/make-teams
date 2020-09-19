import { useMutation, queryCache } from "react-query";

import { ILayout } from "../../containers/MakeTeam/types";
import { DeleteCustomLayoutMutationVariables } from "../../graphql/API";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";

export default function useRemoveLayout() {
  return useMutation<boolean, Error, DeleteCustomLayoutMutationVariables>(
    async (layout): Promise<boolean> => {
      const response = await sdk.DeleteCustomLayout(layout);
      return response.deleteCustomLayout;
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (layout) => {
        queryCache.cancelQueries(QUERY_KEY);

        const previousValue = queryCache.getQueryData(QUERY_KEY);

        queryCache.setQueryData(
          QUERY_KEY,
          (layouts: Array<ILayout> | undefined) => {
            if (!layouts) return [];
            return layouts.filter((l) => l.id !== layout.id);
          }
        );

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        // TODO: we should show an error global message to the user
        queryCache.setQueryData(QUERY_KEY, previousValue);
      },
      // After success or failure, refetch the todos query
      onSettled: () => {
        // TODO: we should show a success global message to the user
        queryCache.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
