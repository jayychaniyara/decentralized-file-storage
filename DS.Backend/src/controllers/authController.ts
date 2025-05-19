import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { generateOtp } from "../utils/otpGenerator";
import { sendOtpEmail } from "../utils/forgotPasswordMailer";
import { setOtp, getOtp } from "../utils/forgotPasswordOTPstore";

// Register Controller
export const register = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Login Controller
export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(400).json({
        error: "This user signed up with Google. Please use Google login.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({ id: user._id });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, lastLogin: user.lastLogin }
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Send OTP Controller - Reset Password
export const resetPasswordSendOTP = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email is not registered." });
    }

    // Generate and send OTP
    const otp = generateOtp();
    await sendOtpEmail(email, otp, user.name);
    setOtp(email, otp);

    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ error: "Failed to send OTP." });
  }
};

// verifyOTP Controller - Reset Password
export const resetPasswordVerifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required." });
  }

  const storedOtpData = getOtp(email);

  if (!storedOtpData) {
    return res.status(400).json({ error: "No OTP found for this email." });
  }

  const { otp: storedOtp, expiry } = storedOtpData;

  if (Date.now() > expiry) {
    return res.status(400).json({ error: "OTP has expired." });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({ error: "Invalid OTP." });
  }

  return res.status(200).json({ message: "OTP verified successfully." });
};

// Reset password controller
export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and new password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ error: "Failed to reset password." });
  }
};

// Send OTP Controller - Sign Up
export const SignupSendOTP = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Generate and send OTP
    const otp = generateOtp();
    await sendOtpEmail(email, otp);
    setOtp(email, otp);

    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ error: "Failed to send OTP." });
  }
};

// verifyOTP Controller - Sign Up
export const SignupVerifyOTP = async (req: Request, res: Response): Promise<any> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required." });
  }

  const storedOtpData = getOtp(email);

  if (!storedOtpData) {
    return res.status(400).json({ error: "No OTP found for this email." });
  }

  const { otp: storedOtp, expiry } = storedOtpData;

  if (Date.now() > expiry) {
    return res.status(400).json({ error: "OTP has expired." });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({ error: "Invalid OTP." });
  }

  return res.status(200).json({ message: "OTP verified successfully." });
};