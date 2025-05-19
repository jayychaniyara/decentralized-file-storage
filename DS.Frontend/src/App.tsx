import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useAutoLogin } from "./hooks/useAutoLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { LoaderProvider } from "@/contexts/LoaderContext";
import AuthGuard from "./routes/AuthGuard";
import DashboardGuard from "./routes/DashboardGuard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useAutoLogin();

  return (
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/" element={<AuthGuard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard/:id"
        element={
          <DashboardGuard>
            <Dashboard />
          </DashboardGuard>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/BlockStore">
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LoaderProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
