import { useMutation, queryCache } from "react-query";

import { EditCustomLayoutMutationVariables } from "../../graphql/API";
import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as LayoutLocalStorage from "../../localStorage/layout";

export default function useEditLayout() {
  const { user } = useAuth();

  return useMutation<Boolean, Error, EditCustomLayoutMutationVariables>(
    async (layout): Promise<boolean> => {
      if (user) {
        return (await sdk.EditCustomLayout(layout)).editCustomLayout;
      } else {
        return LayoutLocalStorage.edit(layout);
      }
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
          (layouts: Array<ILayout> | undefined): Array<ILayout> => {
            if (!layouts) {
              return [];
            }

            const index = layouts.findIndex((l) => l.id === layout.id);
            return [
              ...layouts.slice(0, index),
              { ...layouts[index], ...layout },
              ...layouts.slice(index + 1),
            ];
          }
        );

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (__err, __variables, previousValue) => {
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
