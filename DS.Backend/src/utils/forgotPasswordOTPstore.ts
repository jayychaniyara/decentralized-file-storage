interface OtpStore {
  [email: string]: {
    otp: string;
    expiry: number;
  };
}

const otpStore: OtpStore = {}; 

export const setOtp = (email: string, otp: string): void => {
  otpStore[email] = {
    otp,
    expiry: Date.now() + 10 * 60 * 1000,
  };
};

export const getOtp = (email: string): { otp: string; expiry: number } | null => {
  return otpStore[email] || null;
};
