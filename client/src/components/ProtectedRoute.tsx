import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return children;
}
