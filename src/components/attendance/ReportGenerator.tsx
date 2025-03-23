import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  FileText,
  Filter,
  Printer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

interface ReportGeneratorProps {
  className?: string;
}

const ReportGenerator = ({ className = "" }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState("weekly");
  const [selectedClass, setSelectedClass] = useState("all");
  const [date, setDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  // Mock data for demonstration
  const mockStudents = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      class: "7A",
      attendance: 95,
      absences: 1,
      late: 2,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Budi Santoso",
      class: "7A",
      attendance: 88,
      absences: 3,
      late: 1,
      status: "Good",
    },
    {
      id: 3,
      name: "Citra Dewi",
      class: "7A",
      attendance: 75,
      absences: 5,
      late: 4,
      status: "Average",
    },
    {
      id: 4,
      name: "Dian Purnama",
      class: "7A",
      attendance: 92,
      absences: 2,
      late: 0,
      status: "Excellent",
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      class: "7A",
      attendance: 80,
      absences: 4,
      late: 2,
      status: "Good",
    },
  ];

  const mockClasses = [
    { id: "all", name: "All Classes" },
    { id: "7A", name: "Class 7A" },
    { id: "7B", name: "Class 7B" },
    { id: "8A", name: "Class 8A" },
    { id: "8B", name: "Class 8B" },
    { id: "9A", name: "Class 9A" },
    { id: "9B", name: "Class 9B" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Average":
        return "bg-yellow-100 text-yellow-800";
      case "Poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Attendance Reports
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Report Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weekly" onValueChange={setReportType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Class</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all" onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {reportType === "weekly" ? "Week Range" : "Month"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportType === "weekly" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange as any}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "MMMM yyyy")
                      ) : (
                        <span>Pick a month</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>
              {reportType === "weekly"
                ? `Weekly report from ${dateRange.from ? format(dateRange.from, "LLL dd, y") : ""} to ${dateRange.to ? format(dateRange.to, "LLL dd, y") : ""}`
                : `Monthly report for ${format(date, "MMMM yyyy")}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead>Absences</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                    <TableCell>{student.absences}</TableCell>
                    <TableCell>{student.late}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              Showing {mockStudents.length} students
            </div>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Full Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ReportGenerator;
