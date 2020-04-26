import * as React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";

import useAuth from "./useAuth";

interface IProps extends RouteComponentProps {
  component: React.ElementType;
}

export default function ProtectedRoute(props: IProps) {
  const { component: Component, ...rest } = props;
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return user ? <Component {...rest} /> : <Redirect to="/login" noThrow />;
}
