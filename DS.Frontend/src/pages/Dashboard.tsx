import React, { useEffect, useState } from "react";
import {
  User,
  FileIcon,
  ImageIcon,
  FileTextIcon,
  Video,
  Search,
  LogOut
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardStats from "@/components/dashboard/DashboardStats";
import FileTable from "@/components/dashboard/FileTable";
import CtaSection from "@/components/dashboard/CtaSection";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { getUserIdFromToken, removeToken } from "@/utils/tokenUtils";
import { useLoader } from "@/contexts/LoaderContext";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showLoader, hideLoader } = useLoader();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    showLoader();
    const tokenUserId = getUserIdFromToken();

    if (!tokenUserId || tokenUserId !== id) {
      removeToken();
      navigate("/login", { replace: true });
      hideLoader();
    }
    hideLoader();
  }, [id, navigate]);

  // Mock data - In a real app, this would come from an API
  const userStats = {
    totalFiles: 42,
    fileCategories: [
      { name: "Documents", value: 18, color: "#0EA5E9" },
      { name: "Images", value: 12, color: "#8B5CF6" },
      { name: "PDFs", value: 8, color: "#22D3EE" },
      { name: "Videos", value: 4, color: "#EC4899" }
    ],
    recentActivity: [] // Empty array since we're removing the activity graph
  };

  // Generate more mock files for better pagination demonstration
  const generateMockFiles = () => {
    const baseFiles = [
      {
        id: 1,
        name: "Project_Proposal.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadDate: "Today, 2:30 PM",
        icon: <FileIcon className="text-neon-blue" />
      },
      {
        id: 2,
        name: "Team_Photo.jpg",
        type: "image",
        size: "3.8 MB",
        uploadDate: "Today, 10:15 AM",
        icon: <ImageIcon className="text-neon-purple" />
      },
      {
        id: 3,
        name: "Meeting_Notes.docx",
        type: "document",
        size: "1.2 MB",
        uploadDate: "Yesterday",
        icon: <FileTextIcon className="text-neon-cyan" />
      },
      {
        id: 4,
        name: "Product_Demo.mp4",
        type: "video",
        size: "18.7 MB",
        uploadDate: "2 days ago",
        icon: <Video className="text-rose-500" />
      },
      {
        id: 5,
        name: "Financial_Report.xlsx",
        type: "document",
        size: "3.1 MB",
        uploadDate: "3 days ago",
        icon: <FileTextIcon className="text-green-500" />
      }
    ];

    // Create additional files based on the base files
    const extendedFiles = [];
    for (let i = 0; i < 4; i++) {
      baseFiles.forEach((file, index) => {
        extendedFiles.push({
          ...file,
          id: baseFiles.length * i + index + 6,
          name: `${file.name.split(".")[0]}_v${i + 2}.${
            file.name.split(".")[1]
          }`,
          uploadDate: `${i + 4} days ago`
        });
      });
    }

    return [...baseFiles, ...extendedFiles];
  };

  const recentFiles = generateMockFiles();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You’ve been successfully logged out"
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would trigger an API search
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 glass-card">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-white font-bold text-xl">BlockStore</span>
          </div>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative mr-4">
              <Input
                type="text"
                placeholder="Search files..."
                className="pl-8 glass-button bg-white/5 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="glass-button rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>User Profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="glass-button rounded-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log Out</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="pt-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gradient">Dashboard</h1>

        {/* User File Statistics Section */}
        <DashboardStats userStats={userStats} />

        {/* Recent Uploads Section */}
        <FileTable recentFiles={recentFiles} />

        {/* CTA Section */}
        <CtaSection />

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
