import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  nisn: string;
  name: string;
  class: string;
  grade: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  gender: "male" | "female";
  dateOfBirth: string;
}

interface StudentTableProps {
  students?: Student[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const StudentTable = ({
  students = mockStudents,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false,
}: StudentTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Student>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const itemsPerPage = 10;

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nisn.includes(searchQuery) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate students
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: keyof Student) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      case "transferred":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Student Records</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name, NISN, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">Export</Button>
          <Button>Add Student</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("nisn")}
                  >
                    NISN{" "}
                    {sortField === "nisn" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name{" "}
                    {sortField === "name" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("class")}
                  >
                    Class{" "}
                    {sortField === "class" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("grade")}
                  >
                    Grade{" "}
                    {sortField === "grade" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("gender")}
                  >
                    Gender{" "}
                    {sortField === "gender" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status{" "}
                    {sortField === "status" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.nisn}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        {student.gender === "male" ? "Male" : "Female"}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(getStatusColor(student.status))}>
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onView(student.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEdit(student.id)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDelete(student.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredStudents.length)}{" "}
                of {filteredStudents.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Mock data for default display
const mockStudents: Student[] = [
  {
    id: "1",
    nisn: "1001001001",
    name: "Ahmad Rizky",
    class: "10-A",
    grade: "10",
    status: "active",
    gender: "male",
    dateOfBirth: "2006-05-15",
  },
  {
    id: "2",
    nisn: "1001001002",
    name: "Budi Santoso",
    class: "10-A",
    grade: "10",
    status: "active",
    gender: "male",
    dateOfBirth: "2006-03-22",
  },
  {
    id: "3",
    nisn: "1001001003",
    name: "Citra Dewi",
    class: "10-B",
    grade: "10",
    status: "active",
    gender: "female",
    dateOfBirth: "2006-07-10",
  },
  {
    id: "4",
    nisn: "1001001004",
    name: "Dian Purnama",
    class: "10-B",
    grade: "10",
    status: "inactive",
    gender: "female",
    dateOfBirth: "2006-11-05",
  },
  {
    id: "5",
    nisn: "1001001005",
    name: "Eko Prasetyo",
    class: "11-A",
    grade: "11",
    status: "active",
    gender: "male",
    dateOfBirth: "2005-04-18",
  },
  {
    id: "6",
    nisn: "1001001006",
    name: "Fitri Handayani",
    class: "11-A",
    grade: "11",
    status: "active",
    gender: "female",
    dateOfBirth: "2005-09-30",
  },
  {
    id: "7",
    nisn: "1001001007",
    name: "Gunawan Wibowo",
    class: "11-B",
    grade: "11",
    status: "transferred",
    gender: "male",
    dateOfBirth: "2005-02-14",
  },
  {
    id: "8",
    nisn: "1001001008",
    name: "Hana Permata",
    class: "11-B",
    grade: "11",
    status: "active",
    gender: "female",
    dateOfBirth: "2005-06-22",
  },
  {
    id: "9",
    nisn: "1001001009",
    name: "Irfan Hakim",
    class: "12-A",
    grade: "12",
    status: "active",
    gender: "male",
    dateOfBirth: "2004-08-11",
  },
  {
    id: "10",
    nisn: "1001001010",
    name: "Jasmine Putri",
    class: "12-A",
    grade: "12",
    status: "active",
    gender: "female",
    dateOfBirth: "2004-12-03",
  },
  {
    id: "11",
    nisn: "1001001011",
    name: "Kurniawan Adi",
    class: "12-B",
    grade: "12",
    status: "graduated",
    gender: "male",
    dateOfBirth: "2004-01-25",
  },
  {
    id: "12",
    nisn: "1001001012",
    name: "Lina Mariani",
    class: "12-B",
    grade: "12",
    status: "active",
    gender: "female",
    dateOfBirth: "2004-05-17",
  },
];

export default StudentTable;
