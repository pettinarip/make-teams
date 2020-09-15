import * as React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";

import useAuth from "../../domain/user/useAuth";

interface IProps extends RouteComponentProps {
  component: React.ElementType;
}

export default function ProtectedRoute(props: IProps) {
  const { component: Component, ...rest } = props;
  const { user, isFetching } = useAuth();

  if (isFetching) {
    // TODO: show full page spinner
    return null;
  }

  return user ? <Component {...rest} /> : <Redirect to="/login" noThrow />;
}
