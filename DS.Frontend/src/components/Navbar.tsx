import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const isLoggedIn = false;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 glass-card space-x-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/index" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center hidden md:inline-flex">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-white font-bold text-xl">BlockStore</span>
        </Link>

        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-sm px-4 py-2 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="glass-button text-sm px-4 py-2"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-sm px-4 py-2 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
