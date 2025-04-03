import React from "react";
import { Shield, Database, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: <Database className="w-8 h-8 text-neon-blue" />,
    title: "Decentralized Storage",
    description:
      "Your files are split and stored across a global network, not on centralized servers prone to failure."
  },
  {
    icon: <Shield className="w-8 h-8 text-neon-purple" />,
    title: "Blockchain Security",
    description:
      "Each file is secured with military-grade encryption and verified by our blockchain network."
  },
  {
    icon: <Lock className="w-8 h-8 text-neon-cyan" />,
    title: "Tamper-Proof Access",
    description:
      "Your data can't be altered or accessed without your permission, guaranteed by cryptography."
  },
  {
    icon: <Zap className="w-8 h-8 text-neon-blue" />,
    title: "Fast Retrieval",
    description:
      "Advanced routing ensures your files are retrieved at lightning speed from optimal network nodes."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">BlockStore</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our cutting-edge technology provides benefits that traditional
            storage solutions simply can't match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-3 inline-block rounded-lg glass-card">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
