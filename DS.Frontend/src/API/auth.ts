import axios from "../utils/axios";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
 try {
    const res = await axios.post("/api/auth/register", data);
    return res.data;
  } catch (err: any) {
    throw err?.response?.data?.error || "Something went wrong.";
  }
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    return axios.post("/api/auth/login", data);
  } catch (err: any) {
    throw err?.response?.data?.error || "Something went wrong.";
  }
};

export const resetPasswordSendOtp = async (email: string) => {
  const response = await axios.post("/api/auth/resetPasswordSendOTP", { email });
  return response.data;
};

export const resetPasswordVerifyOtp = async (email: string, otp: string) => {
  const response = await axios.post("/api/auth/resetPasswordVerifyOTP", { email, otp });
  return response.data;
};

export const resetPassword = async (email: string, password: string) => {
  const response = await axios.post("/api/auth/reset-password", { email, password });
  return response.data;
};

export const SignupSendOTP = async (email: string) => {
  const response = await axios.post("/api/auth/SignupSendOTP", { email });
  return response.data;
};

export const SignupVerifyOTP = async (email: string, otp: string) => {
  const response = await axios.post("/api/auth/SignupVerifyOTP", { email, otp });
  return response.data;
};