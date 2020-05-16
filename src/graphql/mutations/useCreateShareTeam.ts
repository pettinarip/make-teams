import { useMutation } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

import { IPosition } from "../../containers/MakeTeam/types";
import { createShareLink } from "../mutations";

interface IMutationProps {
  name: string;
  positions: Array<IPosition>;
}

export default function useCreateShareTeam() {
  return useMutation<any, IMutationProps>(async ({ name, positions }) => {
    return API.graphql(
      graphqlOperation(createShareLink, {
        input: { name, positions: JSON.stringify(positions) },
      })
    );
  });
}
