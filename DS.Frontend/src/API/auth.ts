import axios from "../utils/axios";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return axios.post("/auth/register", data);
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return axios.post("/auth/login", data);
};
