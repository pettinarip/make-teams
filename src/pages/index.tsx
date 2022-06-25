import { AuthContext } from "../contexts/auth";
import MakeTeam from "../containers/MakeTeam";

export interface IProps {}

export default function Index() {
  return (
    <AuthContext.Provider value={{}}>
      <MakeTeam />
    </AuthContext.Provider>
  );
}
