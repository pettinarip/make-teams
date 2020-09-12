import { useMutation } from "react-query";

import sdk from "../sdk";
import { LoginMutation, FieldError } from "../API";

export interface IMutationProps {
  email: string;
  password: string;
}

export default function useLogin() {
  return useMutation<LoginMutation, FieldError[], IMutationProps>(
    (variables) => {
      return sdk.Login(variables);
    }
  );
}
