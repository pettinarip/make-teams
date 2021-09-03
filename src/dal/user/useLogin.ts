import { useMutation, useQueryClient } from "react-query";

import { User } from "../../graphql/API";

export interface IArgs {
  email: string;
  password: string;
}

interface ILoginResponse extends Pick<User, "id" | "email"> {
  message?: string;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<ILoginResponse, any, IArgs>(async (variables) => {
    queryClient.invalidateQueries();
    queryClient.clear();

    const formData = new URLSearchParams();
    formData.append("email", variables.email);
    formData.append("password", variables.password);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: formData,
    });

    return await response.json();
  });
}
