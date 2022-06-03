import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  return !user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
