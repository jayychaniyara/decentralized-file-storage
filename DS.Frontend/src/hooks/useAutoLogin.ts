import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/tokenUtils';
import axios from 'axios';

export const useAutoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tryAutoLogin = async () => {
      if (isTokenValid()) {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get("http://localhost:YOUR_BACKEND_PORT/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          navigate('/dashboard'); 
        } catch (err) {
          console.error('Auto-login failed', err);
          localStorage.removeItem('token');
          localStorage.removeItem('loginTime');
        }
      }
    };

    tryAutoLogin();
  }, [navigate]);
};
