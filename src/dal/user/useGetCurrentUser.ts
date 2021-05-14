import { useQuery } from "react-query";

import sdk from "../../graphql/sdk";
import { FieldError } from "../../graphql/API";
import { IUser } from "./types";

export const QUERY_KEY = "CURRENT_USER";

export default function useGetCurrentUser() {
  return useQuery<IUser | undefined, FieldError[]>(QUERY_KEY, async () => {
    const response = await sdk.Me();
    return response.me as IUser;
  });
}
