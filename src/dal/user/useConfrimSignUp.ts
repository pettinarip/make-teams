import { useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import { ConfirmSignUpMutation, FieldError } from "../../graphql/API";

export interface IMutationProps {
  email: string;
  code: string;
}

export default function useConfirmSignUp() {
  return useMutation<ConfirmSignUpMutation, FieldError[], IMutationProps>(
    (variables) => {
      return sdk.ConfirmSignUp(variables);
    }
  );
}
