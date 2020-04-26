import * as React from "react";
import { Auth } from "aws-amplify";

export default function useAuth() {
  const [state, setState] = React.useState({
    isLoading: true,
    user: null,
  });

  React.useEffect(() => {
    async function isLogin() {
      setState({ isLoading: true, user: null });
      try {
        const user = await Auth.currentAuthenticatedUser();
        setState({ isLoading: false, user });
      } catch (e) {
        console.log(e);
        setState({ isLoading: false, user: null });
      }
    }

    isLogin();
  }, []);

  return state;
}
