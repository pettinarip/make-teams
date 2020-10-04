import { createContext, useMemo, useContext } from "react";

import useGetCurrentUser from "../../dal/user/useGetCurrentUser";
import { IUser } from "../../dal/user/types";

interface IAuthContext {
  user?: IUser;
  isFetching: boolean;
}

const AuthContext = createContext<IAuthContext>({ isFetching: false });
AuthContext.displayName = "AuthContext";

export function AuthProvider(props: any) {
  const { data: user, isFetching } = useGetCurrentUser();

  const value = useMemo(() => ({ user, isFetching }), [user, isFetching]);

  return <AuthContext.Provider value={value} {...props} />;
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
