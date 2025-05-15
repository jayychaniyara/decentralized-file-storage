import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onLearnMoreClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLearnMoreClick }) => {
  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-gradient glow-effect">Decentralized</span>{" "}
              File Storage
              <br />
              <span className="text-white">For the Future</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl">
              Secure, tamper-proof, and lightning-fast decentralized storage
              powered by blockchain technology. Your files, your control,
              anywhere in the world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-purple/30 transition-all duration-300 animate-pulse-glow"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="glass-button"
                onClick={onLearnMoreClick}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="w-full h-80 md:h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 rounded-2xl glass-card animate-glow flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-white/30 rounded-2xl glass-card p-4 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg animate-pulse-glow"></div>
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-white/20 rounded-xl glass-card animate-pulse-glow"></div>
              <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-white/20 rounded-xl glass-card animate-pulse-glow delay-150"></div>
              <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-white/20 rounded-xl glass-card animate-pulse-glow delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
