import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 rounded-full bg-gradient-to-b from-neon-blue to-neon-purple animate-pulse-bar"
            style={{
              animationDelay: `${i * 0.15}s`,
              height: "1.5rem",
              animationDuration: "1.2s"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
