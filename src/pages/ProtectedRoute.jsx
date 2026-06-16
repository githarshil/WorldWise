import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { IsAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!IsAuthenticated) navigate("/");
  }, [IsAuthenticated, navigate]);
  return children;
}

export default ProtectedRoute;
