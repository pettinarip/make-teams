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
      onSuccess: () => {
        return queryCache.invalidateQueries("layouts");
      },
    }
  );
}
