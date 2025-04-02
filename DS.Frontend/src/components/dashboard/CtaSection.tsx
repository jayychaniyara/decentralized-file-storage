
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Shield, Database } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Upload Button Card */}
      <Card className="glass-card border-none shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 opacity-50"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to Upload?</h3>
              <p className="text-gray-400 mb-4">
                Securely store your files with blockchain technology
              </p>
              <Button 
                className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 animate-pulse-glow"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload New File
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center animate-glow">
                <Upload className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="glass-card border-none shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 opacity-50"></div>
        <CardContent className="p-6 relative">
          <h3 className="text-xl font-bold mb-3">Decentralized & Secure</h3>
          <p className="text-gray-400 mb-4">
            Your files are stored on blockchain + IPFS, ensuring maximum security and privacy.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-neon-purple mt-0.5" />
              <div>
                <h4 className="font-medium">Secure</h4>
                <p className="text-sm text-gray-500">End-to-end encryption</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Database className="h-5 w-5 text-neon-blue mt-0.5" />
              <div>
                <h4 className="font-medium">Decentralized</h4>
                <p className="text-sm text-gray-500">No single point of failure</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CtaSection;
