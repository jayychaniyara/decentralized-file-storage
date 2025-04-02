
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, HardDrive, Twitter, Github } from "lucide-react";
import { MessageSquare } from "lucide-react"; // Replacing Discord with MessageSquare as an alternative

const DashboardFooter: React.FC = () => {
  // In a real app, these would come from an API
  const platformStats = {
    activeUsers: 126849,
    totalFiles: 1458732
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <Card className="glass-card border-none shadow-lg mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/10">
                <Users className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-xl font-bold animate-counter-up">{formatNumber(platformStats.activeUsers)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/10">
                <HardDrive className="h-5 w-5 text-neon-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Files Stored</p>
                <p className="text-xl font-bold animate-counter-up">{formatNumber(platformStats.totalFiles)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Twitter className="h-5 w-5 text-gray-300" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Github className="h-5 w-5 text-gray-300" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <MessageSquare className="h-5 w-5 text-gray-300" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFooter;
