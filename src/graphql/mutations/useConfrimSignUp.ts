import { useMutation } from "react-query";

import sdk from "../sdk";
import { ConfirmSignUpMutation, FieldError } from "../API";

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
