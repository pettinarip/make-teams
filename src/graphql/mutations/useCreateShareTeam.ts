// import { useMutation } from "react-query";
// import { graphqlOperation, API } from "aws-amplify";
// import omit from "lodash.omit";

// import { IPosition } from "../../containers/MakeTeam/types";
// import { createShareLink } from "../mutations";

// interface IMutationProps {
//   name: string;
//   positions: Array<IPosition>;
// }

// export default function useCreateShareTeam() {
//   return useMutation<any, IMutationProps>(async ({ name, positions }) => {
//     const cleanedPositions = positions.map((position) => ({
//       ...position,
//       player: omit(position.player, ["createdAt", "createdBy"]),
//     }));

//     return API.graphql(
//       graphqlOperation(createShareLink, {
//         input: { name, positions: cleanedPositions },
//       })
//     );
//   });
// }
export default [];
