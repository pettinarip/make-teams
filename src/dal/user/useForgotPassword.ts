import { useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import {
  ForgotPaswordMutation,
  FieldError,
  ForgotPaswordMutationVariables,
} from "../../graphql/API";

export default function useForgotPassword() {
  return useMutation<
    ForgotPaswordMutation,
    FieldError[],
    ForgotPaswordMutationVariables
  >((variables) => {
    return sdk.ForgotPasword(variables);
  });
}
