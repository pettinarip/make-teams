import { useQuery } from "react-query";
import { graphqlOperation, API } from "aws-amplify";

export default function useGetData() {
  return useQuery("data", async function getData(): Promise<any> {
    const response = (await API.graphql(graphqlOperation(Data))) as any;

    return {
      layouts: response.data.listLayouts.items.map((layout: any) => ({
        ...layout,
        positions: layout.positions.items,
      })),
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
        positions(limit: 15) {
          items {
            id
            x
            y
          }
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