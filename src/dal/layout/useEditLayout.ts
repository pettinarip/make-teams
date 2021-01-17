import { useMutation, useQueryClient } from "react-query";

import { EditCustomLayoutMutationVariables } from "../../graphql/API";
import { ILayout } from "../../containers/MakeTeam/types";
import { QUERY_KEY } from "./useGetLayouts";
import sdk from "../../graphql/sdk";
import { useAuth } from "../../contexts/auth";
import * as LayoutLocalStorage from "../../localStorage/layout";

export default function useEditLayout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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
        queryClient.cancelQueries(QUERY_KEY);

        const previousValue = queryClient.getQueryData(QUERY_KEY);

        queryClient.setQueryData(
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
