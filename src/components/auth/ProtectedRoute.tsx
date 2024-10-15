import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../state";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { authenticated } = useAppSelector((state) => state.user);
  return authenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
