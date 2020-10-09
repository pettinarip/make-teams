import ProtectedRoute from "../components/ProtectedRoute";
import MakeTeam from "../containers/MakeTeam";

export default function Index() {
  return (
    <ProtectedRoute>
      <MakeTeam />
    </ProtectedRoute>
  );
}
