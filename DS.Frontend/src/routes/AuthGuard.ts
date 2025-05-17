import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, getUserIdFromToken, removeToken } from "../utils/tokenUtils";

const AuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = () => {
      if (isTokenValid()) {
        const userId = getUserIdFromToken();
        if (userId) {
          navigate(`/dashboard/${userId}`, { replace: true });
        } else {
          removeToken();
          navigate("/login", { replace: true });
        }
      } else {
        removeToken();
        navigate("/login", { replace: true });
      }
    };

    autoLogin();
  }, [navigate]);

  return null;
};

export default AuthGuard;
