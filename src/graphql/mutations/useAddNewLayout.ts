import { useMutation, queryCache } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { ILayout } from "../../containers/MakeTeam/types";
import { createCustomLayout } from "../mutations";

export default function useAddNewLayout() {
  return useMutation<any, Partial<ILayout>>(
    async (layout) => {
      await API.graphql(
        graphqlOperation(createCustomLayout, { input: layout })
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("layouts", { force: true });
      },
    }
  );
}
