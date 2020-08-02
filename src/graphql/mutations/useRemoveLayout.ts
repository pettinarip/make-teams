import { useMutation, queryCache } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { ILayout } from "../../containers/MakeTeam/types";
import { deleteCustomLayout } from "../mutations";

export default function useRemoveLayout() {
  return useMutation<any, Partial<ILayout>>(
    async (layout) => {
      await API.graphql(
        graphqlOperation(deleteCustomLayout, { input: { id: layout.id } })
      );
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: (layout) => {
        queryCache.cancelQueries("layouts");

        const previousValue = queryCache.getQueryData("layouts");

        queryCache.setQueryData(
          "layouts",
          (layouts: Array<ILayout> | undefined) => {
            if (!layouts) return;
            return layouts.filter((l) => l.id !== layout.id);
          }
        );

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        // TODO: we should show an error global message to the user
        queryCache.setQueryData("layouts", previousValue);
      },
      // After success or failure, refetch the todos query
      onSettled: () => {
        // TODO: we should show a success global message to the user
        queryCache.invalidateQueries("layouts");
      },
    }
  );
}
