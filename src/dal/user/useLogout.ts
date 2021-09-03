import { useMutation, useQueryClient } from "react-query";

import sdk from "../../graphql/sdk";
import { LogoutMutation, FieldError } from "../../graphql/API";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<LogoutMutation, FieldError[]>(() => {
    queryClient.invalidateQueries();
    queryClient.clear();
    return sdk.Logout();
  });
}
