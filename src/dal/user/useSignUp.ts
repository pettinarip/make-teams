import { useMutation } from "react-query";

import sdk from "../../graphql/sdk";
import { SignUpMutation, FieldError } from "../../graphql/API";

export interface IMutationProps {
  email: string;
  password: string;
}

export default function useSignUp() {
  return useMutation<SignUpMutation, FieldError[], IMutationProps>(
    (variables) => {
      return sdk.SignUp(variables);
    }
  );
}
