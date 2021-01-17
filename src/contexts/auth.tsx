import { useRouter } from "next/router";
import { createContext, ReactNode, useContext } from "react";

import useGetCurrentUser from "../dal/user/useGetCurrentUser";
import useLogin, { IArgs } from "../dal/user/useLogin";
import useLogout from "../dal/user/useLogout";
import { IUser } from "../dal/user/types";
import { FieldError } from "../graphql/API";

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: IUser;
  error?: FieldError[] | null;
  login: (args: IArgs) => void;
  logout: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const initialContextState: IAuthContext = {
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialContextState);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: IAuthProviderProps) {
  const router = useRouter();
  const { data: user, isLoading, error } = useGetCurrentUser();
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: logout } = useLogout();

  async function logoutWithRedirect() {
    await logout();
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        error,
        login,
        isLoading,
        logout: logoutWithRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
