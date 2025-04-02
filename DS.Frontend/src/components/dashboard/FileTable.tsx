
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Download, 
  Clock, 
  ArrowUpDown, 
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  icon: React.ReactNode;
}

interface FileTableProps {
  recentFiles: FileItem[];
}

const FileTable: React.FC<FileTableProps> = ({ recentFiles }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [files, setFiles] = useState<FileItem[]>(recentFiles);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 5;

  // Filter files based on search term and type filter
  useEffect(() => {
    let filteredFiles = [...recentFiles];
    
    // Apply type filter
    if (activeFilter !== "all") {
      filteredFiles = filteredFiles.filter(file => file.type === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filteredFiles = filteredFiles.filter(file => 
        file.name.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Apply sort
    filteredFiles.sort((a, b) => {
      const dateA = getDateValue(a.uploadDate);
      const dateB = getDateValue(b.uploadDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    
    setFiles(filteredFiles);
    setCurrentPage(1); // Reset to first page on filter change
  }, [recentFiles, activeFilter, searchTerm, sortOrder]);

  const getDateValue = (dateString: string): number => {
    if (dateString.includes("Today")) return 0;
    if (dateString.includes("Yesterday")) return 1;
    if (dateString.includes("days ago")) {
      const days = parseInt(dateString.split(" ")[0]);
      return days;
    }
    return 1000; // Default for other formats
  };

  const filterFiles = (filterType: string) => {
    setActiveFilter(filterType);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Calculate pagination
  const totalPages = Math.ceil(files.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFiles = files.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Card className="mb-8 glass-card border-none shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <CardTitle className="text-lg font-medium">My Uploaded Files</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                className="pl-8 glass-button bg-white/5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
              <Button 
                variant="outline" 
                size="sm" 
                className={`glass-button ${activeFilter === 'all' ? 'bg-white/20' : ''}`}
                onClick={() => filterFiles("all")}
              >
                All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`glass-button ${activeFilter === 'document' ? 'bg-white/20' : ''}`}
                onClick={() => filterFiles("document")}
              >
                Documents
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`glass-button ${activeFilter === 'image' ? 'bg-white/20' : ''}`}
                onClick={() => filterFiles("image")}
              >
                Images
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`glass-button ${activeFilter === 'pdf' ? 'bg-white/20' : ''}`}
                onClick={() => filterFiles("pdf")}
              >
                PDFs
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`glass-button ${activeFilter === 'video' ? 'bg-white/20' : ''}`}
                onClick={() => filterFiles("video")}
              >
                Videos
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Size</th>
                <th className="text-left py-3 px-4 font-medium">
                  <div className="flex items-center cursor-pointer" onClick={toggleSortOrder}>
                    Upload Date <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.length > 0 ? (
                currentFiles.map((file) => (
                  <tr key={file.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-md bg-white/5">
                          {file.icon}
                        </div>
                        <span>{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{file.size}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{file.uploadDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" className="glass-button h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="glass-button h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-white/10">
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">
                    {searchTerm ? "No files match your search" : "No files found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {/* Generate page buttons */}
                {pageNumbers.map(number => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      isActive={currentPage === number}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {currentFiles.length} of {files.length} files
        </div>
      </CardContent>
    </Card>
  );
};

export default FileTable;
