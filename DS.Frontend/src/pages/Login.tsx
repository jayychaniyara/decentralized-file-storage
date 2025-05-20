import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLoader } from "@/contexts/LoaderContext";
import { googleLogin, loginUser } from "@/API/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Login Failed",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      showLoader();
      const response = await loginUser({ email, password });
      const { token, user } = response.data;

      Cookies.set("token", token, { expires: 1 });

      toast({
        title: "Login Successful",
        description: "Welcome back to BlockStore!"
      });

      navigate(`/dashboard/${user.id}`);
      hideLoader();
    } catch (error: any) {
      hideLoader();
      toast({
        title: "Login Failed",
        description:
          error.response?.data?.error ||
          error.message ||
          "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      toast({ title: "Google login failed", variant: "destructive" });
      return;
    }

    try {
      showLoader();
      const response = await googleLogin(credentialResponse.credential);
      Cookies.set("token", response.token, { expires: 1 });

      toast({ title: "Google login successful" });
      navigate(`/dashboard/${response.user.id}`);
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.response?.data?.error || "Google login error",
        variant: "destructive"
      });
    } finally {
      hideLoader();
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
            <Link to="/index" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-white font-bold text-xl">BlockStore</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-neon-blue hover:text-neon-purple transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-muted/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <div className="mt-3 mb-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              toast({ title: "Google Login Failed", variant: "destructive" });
            }}
          />
        </div>

        <CardFooter>
          <div className="text-center w-full text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-neon-blue hover:text-neon-purple transition-colors font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
