import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Signup = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo signup functionality
    if (name && email && password && agreed) {
      toast({
        title: "Account created",
        description:
          "Welcome to BlockStore! Your account has been created successfully."
      });
    } else {
      toast({
        title: "Signup Failed",
        description: "Please fill in all fields and agree to the terms",
        variant: "destructive"
      });
    }
  };

  const openModal = (type: "terms" | "privacy") => {
    setModalContent(
      type === "terms"
        ? "By signing up, you agree to our Terms of Service. These terms outline your rights and responsibilities when using our decentralized file storage platform, including file uploads, data security, and service limitations. Please review them carefully before proceeding."
        : "Our Privacy Policy explains how we collect, use, and protect your data. Since we use blockchain technology and IPFS for file storage, your files are stored securely and cannot be accessed by unauthorized parties. We do not sell or share your data with third parties."
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
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-white font-bold text-xl">BlockStore</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to join our decentralized network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-muted/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="bg-muted/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 font-medium leading-none"
              >
                I agree to the{" "}
                <span className="inline">
                  <button
                    type="button"
                    onClick={() => openModal("terms")}
                    className="text-neon-blue hover:text-neon-purple transition-colors focus:outline-none"
                  >
                    terms of service
                  </button>
                </span>{" "}
                and{" "}
                <span className="inline">
                  <button
                    type="button"
                    onClick={() => openModal("privacy")}
                    className="text-neon-blue hover:text-neon-purple transition-colors focus:outline-none"
                  >
                    privacy policy
                  </button>
                </span>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center w-full text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-neon-blue hover:text-neon-purple transition-colors font-medium"
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
              {modalContent.startsWith("Our Privacy Policy")
                ? "Privacy Policy"
                : "Terms of Service"}
            </h2>
            <p className="mt-2 text-sm text-gray-300">{modalContent}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 py-2 rounded-lg w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
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
