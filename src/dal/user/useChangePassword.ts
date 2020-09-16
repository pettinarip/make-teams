import { useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import {
  ChangePasswordMutation,
  FieldError,
  MutationChangePasswordArgs,
} from "../../graphql/API";

export default function useChangePassword() {
  return useMutation<
    ChangePasswordMutation,
    FieldError[],
    MutationChangePasswordArgs
  >((variables) => {
    return sdk.ChangePassword(variables);
  });
}
