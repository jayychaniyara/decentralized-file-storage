
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-white font-bold text-xl">NeoStore</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Secure, decentralized file storage for the modern world. Built on blockchain technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-neon-blue transition-colors">Home</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-neon-blue transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-neon-blue transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-gray-500">
          <p>© 2023 NeoStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
