import { createContext, ReactNode, useContext } from "react";

import useGetCurrentUser from "../dal/user/useGetCurrentUser";
import { IUser } from "../dal/user/types";
import { FieldError } from "../graphql/API";

interface IAuthContext {
  isLoading: boolean;
  user?: IUser;
  error?: FieldError[] | null;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const initialContextState: IAuthContext = {
  isLoading: false,
};

const AuthContext = createContext<IAuthContext>(initialContextState);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: IAuthProviderProps) {
  const { data: user, isLoading, error } = useGetCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
