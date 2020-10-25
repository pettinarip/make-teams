import { useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import { ResendConfirmationCodeMutation, FieldError } from "../../graphql/API";

export interface IMutationProps {
  email: string;
}

export default function useResendConfirmationCode() {
  return useMutation<ResendConfirmationCodeMutation, FieldError[], IMutationProps>(
    (variables) => {
      return sdk.ResendConfirmationCode(variables);
    }
  );
}
