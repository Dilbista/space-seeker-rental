
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  // Only render children if admin is logged in
  const isLoggedIn = localStorage.getItem("adminLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
