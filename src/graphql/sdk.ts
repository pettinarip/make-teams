import { GraphQLClient } from "graphql-request";

import { getSdk } from "./API";

// TODO: store endpoint in env
const client = new GraphQLClient("http://localhost:4000/graphql", {
  credentials: "include",
});

export default getSdk(client);
