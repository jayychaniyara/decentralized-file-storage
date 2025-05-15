import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@headlessui/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { registerUser, SignupSendOTP, SignupVerifyOTP } from "@/API/auth";
import { useLoader } from "@/contexts/LoaderContext";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const allFieldsFilled =
    name && email && password && confirmPassword && agreed;

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Email is required.");
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handleSendOtp = async () => {
    handleEmailBlur();

    if (!email || emailError) {
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password must match.",
        variant: "destructive"
      });
      return;
    } else {
      setConfirmPasswordError("");
    }

    try {
      showLoader();
      await SignupSendOTP(email);
      toast({ title: "OTP Sent", description: "Check your email inbox." });
      setIsDisabled(true);
      setOtpSent(true);
    } catch (err: any) {
      toast({
        title: "OTP Error",
        description: err.response?.data?.error || "Failed to send OTP.",
        variant: "destructive"
      });
    } finally {
      hideLoader();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpInputs];
    newOtp[index] = value;
    setOtpInputs(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtpAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpInputs.some((digit) => digit.trim() === "")) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password must match.",
        variant: "destructive"
      });
      return;
    } else {
      setConfirmPasswordError("");
    }

    try {
      const fullOtp = otpInputs.join("");
      await SignupVerifyOTP(email, fullOtp);
      await registerUser({ username: name, email, password });

      toast({
        title: "Account Created 🎉",
        description: "Welcome to BlockStore!"
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Signup Failed",
        description:
          err.response?.data?.error || "OTP verification or signup failed.",
        variant: "destructive"
      });
    }
  };

  const openModal = (type: "terms" | "privacy") => {
    setModalContent(
      type === "terms"
        ? "By signing up, you agree to our Terms of Service..."
        : "Our Privacy Policy explains how we collect and use your data..."
    );
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-blue/10 blur-2xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-neon-blue/10 blur-2xl rounded-full"></div>
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
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Join our decentralized network
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleVerifyOtpAndSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                disabled={isDisabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`bg-muted/50 ${
                  isDisabled ? "border border-neon-blue" : ""
                }`}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                disabled={isDisabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="you@example.com"
                className={`bg-muted/50 ${
                  isDisabled ? "border border-neon-blue" : ""
                } ${emailError ? "border-red-500" : ""}`}
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                disabled={isDisabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className={`bg-muted/50 ${
                  isDisabled ? "border border-neon-blue" : ""
                }`}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                disabled={isDisabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`bg-muted/50 ${
                  isDisabled ? "border border-neon-blue" : ""
                } ${confirmPasswordError ? "border-red-500" : ""}`}
              />
              {confirmPasswordError && (
                <p className="text-sm text-red-500">{confirmPasswordError}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreed}
                disabled={isDisabled}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 font-medium leading-none"
              >
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => openModal("terms")}
                  className="text-neon-blue hover:text-neon-purple"
                >
                  terms of service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => openModal("privacy")}
                  className="text-neon-blue hover:text-neon-purple"
                >
                  privacy policy
                </button>
              </label>
            </div>

            {otpSent ? (
              <>
                <div className="flex justify-between gap-2">
                  {otpInputs.map((digit, idx) => (
                    <Input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el!)}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 h-10 text-center text-lg border border-neon-blue"
                    />
                  ))}
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-neon-blue to-neon-purple"
                >
                  Create Account
                </Button>
              </>
            ) : (
              <Button
                type="button"
                disabled={!allFieldsFilled}
                onClick={handleSendOtp}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-purple"
              >
                Send OTP
              </Button>
            )}
          </form>
        </CardContent>

        <CardFooter>
          <div className="text-center w-full text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-neon-blue hover:text-neon-purple font-medium"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center px-4">
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-md w-full mx-auto">
            <h2 className="text-lg font-semibold text-neon-blue">
              {modalContent.startsWith("Our Privacy")
                ? "Privacy Policy"
                : "Terms of Service"}
            </h2>
            <p className="mt-2 text-sm text-gray-300">{modalContent}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 py-2 rounded-lg w-full bg-gradient-to-r from-neon-blue to-neon-purple"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Signup;
