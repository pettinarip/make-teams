import { GraphQLClient } from "graphql-request";

import { getSdk } from "./API";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, {
  credentials: "include",
});

export default getSdk(client);
