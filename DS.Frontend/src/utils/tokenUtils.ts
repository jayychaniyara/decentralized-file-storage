import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  id: string;
  exp: number;
}

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp >= currentTime;
  } catch {
    return false;
  }
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.id;
  } catch {
    return null;
  }
};

export const removeToken = () => {
  Cookies.remove("token");
};
