import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function GuestRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  // If the user is logged in, redirect them away from guest pages (Login/Register)
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
