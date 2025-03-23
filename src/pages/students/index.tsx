import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Upload } from "lucide-react";
import StudentTable from "@/components/students/StudentTable";
import StudentFilters from "@/components/students/StudentFilters";

interface FilterState {
  class: string;
  grade: string;
  status: string[];
  searchQuery: string;
}

const StudentsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    class: "",
    grade: "",
    status: [],
    searchQuery: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle filter changes from the StudentFilters component
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // In a real app, you would fetch filtered data here
    // For now, we'll just simulate loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Handle search from the StudentFilters component
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    // In a real app, you would fetch searched data here
    // For now, we'll just simulate loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Navigate to student profile page
  const handleViewStudent = (id: string) => {
    navigate(`/students/${id}`);
  };

  // Navigate to student edit page
  const handleEditStudent = (id: string) => {
    navigate(`/students/${id}?edit=true`);
  };

  // Handle student deletion
  const handleDeleteStudent = (id: string) => {
    // In a real app, you would show a confirmation dialog and delete the student
    console.log(`Delete student with ID: ${id}`);
  };

  // Navigate to student registration page
  const handleAddStudent = () => {
    navigate("/students/register");
  };

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Siswa</h1>
          <p className="text-gray-500 mt-1">
            Kelola data siswa, lihat profil, dan tambahkan siswa baru
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Data
          </Button>
          <Button
            onClick={handleAddStudent}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Tambah Siswa
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <StudentFilters
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </div>

      {/* Student Table */}
      <StudentTable
        isLoading={isLoading}
        onView={handleViewStudent}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentsPage;
