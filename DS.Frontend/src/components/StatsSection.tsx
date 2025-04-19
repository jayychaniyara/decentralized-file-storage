import React, { useState, useEffect } from "react";
import { Users, HardDrive } from "lucide-react";
import { getActiveUserCount } from "@/API/user.service";

const CounterAnimation = ({
  end,
  duration = 2000,
  label,
  icon
}: {
  end: number;
  duration?: number;
  label: string;
  icon: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const progressPercent = Math.min(progress / duration, 1);
      setCount(Math.floor(end * progressPercent));

      if (progressPercent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return (
    <div className="glass-card p-6 rounded-xl text-center animate-counter-up">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 rounded-lg glass-card inline-block">{icon}</div>
      </div>
      <div className="text-4xl font-bold mb-2 text-gradient">
        {count.toLocaleString()}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getActiveUserCount();
      setActiveUsers(count);
    };

    fetchUserCount();
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-slide-up">
          <h2 className="text-3xl font-bold mb-4">
            Live <span className="text-gradient">Statistics</span>
          </h2>
          <p className="text-gray-400">
            Real-time metrics from our global decentralized network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <CounterAnimation
            end={activeUsers}
            label="Active Customers"
            icon={<Users className="w-8 h-8 text-neon-blue" />}
          />
          <CounterAnimation
            end={18723452}
            label="Files Stored"
            icon={<HardDrive className="w-8 h-8 text-neon-purple" />}
            duration={2500}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
