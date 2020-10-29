import { queryCache, useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import { LogoutMutation, FieldError } from "../../graphql/API";

export interface IMutationProps {}

export default function useLogout() {
  return useMutation<LogoutMutation, FieldError[], IMutationProps>(() => {
    queryCache.clear()
    return sdk.Logout();
  });
}
