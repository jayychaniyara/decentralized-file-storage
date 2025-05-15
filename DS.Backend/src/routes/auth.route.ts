import express from "express";
import { register, login, resetPasswordVerifyOtp, resetPasswordSendOTP, resetPassword, SignupSendOTP, SignupVerifyOTP } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/resetPasswordSendOTP", resetPasswordSendOTP);
router.post("/resetPasswordVerifyOTP", resetPasswordVerifyOtp);
router.post("/reset-password", resetPassword);
router.post("/SignupSendOTP", SignupSendOTP);
router.post("/SignupVerifyOTP", SignupVerifyOTP);


export default router;
