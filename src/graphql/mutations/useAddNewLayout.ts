import { useMutation, queryCache } from "react-query";
import { graphqlOperation, API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

import { ILayout } from "../../containers/MakeTeam/types";
import { createCustomLayout } from "../mutations";

export default function useAddNewLayout() {
  return useMutation<any, Partial<ILayout>>(
    async (layout) => {
      await API.graphql(
        graphqlOperation(createCustomLayout, {
          input: layout,
        })
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
            return [...layouts, { ...layout, isCustom: true }] as Array<
              ILayout
            >;
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

export function newLayout(layout: Partial<ILayout>): ILayout {
  return {
    ...layout,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  } as ILayout;
}
