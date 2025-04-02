
import React from "react";
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface FileCategory {
  name: string;
  value: number;
  color: string;
}

interface UserStats {
  totalFiles: number;
  fileCategories: FileCategory[];
  recentActivity: { date: string; count: number }[]; // Keeping this for type compatibility
}

interface DashboardStatsProps {
  userStats: UserStats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Total Files Card */}
      <Card className="glass-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Total Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gradient">{userStats.totalFiles}</div>
          <p className="text-sm text-muted-foreground mt-2">
            All files stored on the blockchain
          </p>
        </CardContent>
      </Card>

      {/* File Categories Chart */}
      <Card className="glass-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">File Categories</CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <ChartContainer 
            className="h-[180px]" 
            config={{
              documents: { color: "#0EA5E9" },
              images: { color: "#8B5CF6" },
              pdfs: { color: "#22D3EE" },
              videos: { color: "#EC4899" }
            }}
          >
            <PieChart>
              <Pie
                data={userStats.fileCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
              >
                {userStats.fileCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent />
                }
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
