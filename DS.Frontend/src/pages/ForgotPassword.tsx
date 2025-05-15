import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { resetPasswordSendOtp, resetPasswordVerifyOtp } from "@/API/auth";
import { useLoader } from "@/contexts/LoaderContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showLoader, hideLoader } = useLoader();

  const handleSendOtp = async () => {
    const trimmedEmail = email.trim();

    //Check for empty email
    if (!trimmedEmail) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    //Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    try {
      showLoader();
      await resetPasswordSendOtp(trimmedEmail);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your email for the OTP."
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Something went wrong.";
      toast({
        title: "Failed to Send OTP",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      hideLoader();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleConfirmOtp = async () => {
    const finalOtp = otp.join("").trim();

    // Check if OTP is empty
    if (!finalOtp) {
      toast({
        title: "Missing OTP",
        description: "Please enter the OTP sent to your email",
        variant: "destructive"
      });
      return;
    }

    // Check if OTP is not numeric or not 6 digits
    if (!/^\d{6}$/.test(finalOtp)) {
      toast({
        title: "Invalid OTP",
        description: "OTP must be exactly 6 numeric digits",
        variant: "destructive"
      });
      return;
    }

    try {
      await resetPasswordVerifyOtp(email, finalOtp);

      toast({
        title: "OTP Verified ✅",
        description: "You can now reset your password"
      });

      navigate("/reset-password", { state: { email } });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast({
        title: "OTP Verification Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-blue/10 blur-2xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-neon-purple/10 blur-2xl rounded-full"></div>
      </div>

      <Card className="w-full max-w-md glass-card animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-white font-bold text-xl">BlockStore</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            {otpSent
              ? "Enter the 6-digit OTP sent to your email"
              : "Confirm your email to receive OTP"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-muted/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => {
                    if (el) inputsRef.current[index] = el;
                  }}
                  className="text-center bg-muted/50"
                />
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={otpSent ? handleConfirmOtp : handleSendOtp}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
          >
            {otpSent ? "Confirm OTP" : "Send OTP"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
