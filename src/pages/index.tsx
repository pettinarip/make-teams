import { GetServerSideProps } from "next";
import { AuthContext } from "../contexts/auth";
import MakeTeam from "../containers/MakeTeam";
import { IUser } from "../dal/user/types";
import sdk from "../graphql/sdk";

export interface IProps {
  user?: IUser;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  req,
}) => {
  const headers = new Headers();
  if (req.headers.cookie) {
    headers.append("cookie", req.headers.cookie);
  }

  try {
    const response = await sdk.Me(undefined, headers);
    const user = response.me as IUser;

    return {
      props: { user },
    };
  } catch (e) {
    // TODO: log error information
  }

  return { props: {} };
};

export default function Index({ user }: IProps) {
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      <MakeTeam />
    </AuthContext.Provider>
  );
}
