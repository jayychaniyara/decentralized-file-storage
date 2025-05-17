import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, getUserIdFromToken, removeToken } from "../utils/tokenUtils";
import { useToast } from "@/components/ui/use-toast";

const AuthGuard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const autoLogin = () => {
      if (isTokenValid()) {
        const userId = getUserIdFromToken();
        if (userId) {
          navigate(`/dashboard/${userId}`, { replace: true });
          toast({
              title: "Auto-Login Successful",
              description: "Welcome to BlockStore!"
          });
        } else {
          removeToken();
          navigate("/index", { replace: true });
          toast({
              title: "Please Login Again",
              description: "Token Expired!"
          });
        }
      } else {
        removeToken();
        navigate("/index", { replace: true });
      }
    };

    autoLogin();
  }, [navigate]);

  return null;
};

export default AuthGuard;
