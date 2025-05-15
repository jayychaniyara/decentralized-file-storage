import React, { forwardRef } from "react";
import { Upload, FileArchive, Download } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-10 h-10 text-neon-blue" />,
    title: "Upload File",
    description: "Simply drag and drop your files into our secure platform",
    delay: 0
  },
  {
    icon: <FileArchive className="w-10 h-10 text-neon-purple" />,
    title: "Blockchain Hashing",
    description: "Files are encrypted, split, and secured on the blockchain",
    delay: 200
  },
  {
    icon: <Download className="w-10 h-10 text-neon-cyan" />,
    title: "Secure Retrieval",
    description: "Access your files anytime, anywhere with your secure key",
    delay: 400
  }
];

const HowItWorksSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three simple steps to secure your files forever on our decentralized
            network.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl text-center w-full md:w-1/3 animate-slide-up"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="mb-6 mx-auto p-4 inline-block rounded-full glass-card">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}

          <div className="hidden md:block absolute top-1/2 left-1 w-1/3 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
          <div className="hidden md:block absolute top-1/2 right-1 w-1/3 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan"></div>
        </div>
      </div>
    </section>
  );
});

export default HowItWorksSection;
