import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserIdFromToken, removeToken } from "../utils/tokenUtils";
import showLoader from "../components/Loader";
import hideLoader from "../components/Loader";

interface Props {
  children: React.ReactNode;
}

const DashboardGuard: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    showLoader();
    const tokenUserId = getUserIdFromToken();

    if (!tokenUserId || tokenUserId !== id) {
      removeToken();
      navigate("/login", { replace: true });
    }
    hideLoader();
  }, [id, navigate]);

  return <>{children}</>;
};

export default DashboardGuard;
