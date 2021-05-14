import { createContext, useContext } from "react";

import { IUser } from "../dal/user/types";

interface IAuthContext {
  user?: IUser;
}

const initialContextState: IAuthContext = {};

export const AuthContext = createContext<IAuthContext>(initialContextState);
AuthContext.displayName = "AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
