import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

export const QUERY_KEY = "data";

export default function useGetData() {
  return useQuery(QUERY_KEY, async function getData(): Promise<any> {
    const response = (await API.graphql(graphqlOperation(Data))) as any;

    return {
      layouts: response.data.listLayouts.items,
      players: response.data.listPlayers.items,
    };
  });
}

const Data = `
  query getData {
    listLayouts {
      items {
        id
        name
        createdAt
        positions {
          x
          y
        }
      }
    }
    listPlayers(limit: 20) {
      items {
        id
        firstName
        lastName
        number
      }
    }
}
`;
