import { useMutation, useQueryClient } from "react-query";

import sdk from "../../graphql/sdk";
import { FieldError, LoginMutation } from "../../graphql/API";
import { QUERY_KEY as USER_QUERY_KEY } from "./useGetCurrentUser";

export interface IArgs {
  email: string;
  password: string;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginMutation, FieldError[], IArgs>(
    (variables) => {
      return sdk.Login(variables);
    },
    {
      onSuccess: (response) => {
        if (!response.login.errors) {
          queryClient.setQueryData(USER_QUERY_KEY, () => response.login.user);
        }
      },
    }
  );
}
