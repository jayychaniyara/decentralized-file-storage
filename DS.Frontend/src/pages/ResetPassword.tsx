import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword } from "@/API/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const email = location.state?.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedPassword || !trimmedConfirm) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (trimmedPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters.",
        variant: "destructive"
      });
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (!email) {
      toast({
        title: "Invalid Access",
        description: "Email not found. Restart the process.",
        variant: "destructive"
      });
      navigate("/forgot-password");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email, trimmedPassword);
      toast({
        title: "Success",
        description: "Password reset successful. Please log in."
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.response?.data?.error || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password to reset your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="New Password"
                className="bg-muted/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="bg-muted/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
