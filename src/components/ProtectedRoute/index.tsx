import * as React from "react";
import { Auth } from "aws-amplify";
import { Redirect, RouteComponentProps } from "@reach/router";

interface IProps extends RouteComponentProps {
  component: React.ElementType;
}

export default function ProtectedRoute(props: IProps) {
  const { component: Component, ...rest } = props;
  const { isLogged, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return isLogged ? <Component {...rest} /> : <Redirect to="/login" noThrow />;
}

function useAuth() {
  const [state, setState] = React.useState({
    isLoading: true,
    isLogged: false,
  });

  React.useEffect(() => {
    async function isLogin() {
      setState({ isLoading: true, isLogged: false });
      try {
        await Auth.currentAuthenticatedUser();
        setState({ isLoading: false, isLogged: true });
      } catch (e) {
        console.log(e);
        setState({ isLoading: false, isLogged: false });
      }
    }

    isLogin();
  }, []);

  return state;
}
