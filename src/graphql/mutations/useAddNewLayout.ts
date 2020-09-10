// import { useMutation, queryCache } from "react-query";
// import { graphqlOperation, API } from "aws-amplify";

// import { ILayout } from "../../containers/MakeTeam/types";
// import { createCustomLayout } from "../mutations";
// import { QUERY_KEY } from "../queries/useGetLayouts";

// export default function useAddNewLayout() {
//   return useMutation<any, Partial<ILayout>>(
//     async (layout) => {
//       await API.graphql(
//         graphqlOperation(createCustomLayout, {
//           input: layout,
//         })
//       );
//     },
//     {
//       onSuccess: () => {
//         // TODO: we should show a success global message to the user
//         return queryCache.invalidateQueries(QUERY_KEY);
//       },
//     }
//   );
// }

export default [];
