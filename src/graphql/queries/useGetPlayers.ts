// import { useQuery } from "react-query";
// import { graphqlOperation, API } from "aws-amplify";
// import { QueryResult } from "react-query/types";

// import { listPlayers } from "../queries";
// import { IPlayer } from "../../containers/MakeTeam/types";

// export const QUERY_KEY = "players";

// export default function useGetPlayers(user: any): QueryResult<Array<IPlayer>> {
//   return useQuery(
//     QUERY_KEY,
//     async (): Promise<Array<IPlayer>> => {
//       const response = (await API.graphql(
//         graphqlOperation(listPlayers, {
//           filter: { createdBy: { eq: user.username } },
//           limit: 20,
//         })
//       )) as any;

//       return response.data.listPlayers.items;
//     },
//     {
//       enabled: !!user,
//     }
//   );
// }
export default [];
