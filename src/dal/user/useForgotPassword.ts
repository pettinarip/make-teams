import { useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import { ForgotPaswordMutation, FieldError } from "../../graphql/API";

export default function useForgotPassword() {
  return useMutation<ForgotPaswordMutation, FieldError[], string>((email) => {
    return sdk.ForgotPasword({ email });
  });
}
