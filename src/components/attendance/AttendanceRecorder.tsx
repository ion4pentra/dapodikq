import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, Save, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  nisn: string;
  class: string;
  status: "present" | "absent" | "late" | "sick" | "permission" | "";
  notes: string;
}

interface AttendanceRecorderProps {
  classes?: string[];
  students?: Student[];
  date?: Date;
  onSave?: (data: { date: Date; classId: string; students: Student[] }) => void;
}

const AttendanceRecorder = ({
  classes = [
    "Kelas 1A",
    "Kelas 1B",
    "Kelas 2A",
    "Kelas 2B",
    "Kelas 3A",
    "Kelas 3B",
    "Kelas 4A",
    "Kelas 4B",
    "Kelas 5A",
    "Kelas 5B",
    "Kelas 6A",
    "Kelas 6B",
  ],
  students = [
    {
      id: "1",
      name: "Ahmad Rizky",
      nisn: "1234567890",
      class: "Kelas 1A",
      status: "",
      notes: "",
    },
    {
      id: "2",
      name: "Budi Santoso",
      nisn: "2345678901",
      class: "Kelas 1A",
      status: "",
      notes: "",
    },
    {
      id: "3",
      name: "Citra Dewi",
      nisn: "3456789012",
      class: "Kelas 1A",
      status: "",
      notes: "",
    },
    {
      id: "4",
      name: "Dian Purnama",
      nisn: "4567890123",
      class: "Kelas 1A",
      status: "",
      notes: "",
    },
    {
      id: "5",
      name: "Eko Prasetyo",
      nisn: "5678901234",
      class: "Kelas 1A",
      status: "",
      notes: "",
    },
  ],
  date = new Date(),
  onSave = () => {},
}: AttendanceRecorderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<Student[]>(students);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter students based on selected class and search query
  const filteredStudents = attendanceData.filter(
    (student) =>
      student.class === selectedClass &&
      (searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nisn.includes(searchQuery)),
  );

  const handleStatusChange = (
    studentId: string,
    status: "present" | "absent" | "late" | "sick" | "permission",
  ) => {
    setAttendanceData(
      attendanceData.map((student) =>
        student.id === studentId ? { ...student, status } : student,
      ),
    );
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceData(
      attendanceData.map((student) =>
        student.id === studentId ? { ...student, notes } : student,
      ),
    );
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSave({
        date: selectedDate,
        classId: selectedClass,
        students: attendanceData.filter(
          (student) => student.class === selectedClass,
        ),
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      // Reset attendance status for the selected class
      setAttendanceData(
        attendanceData.map((student) =>
          student.class === selectedClass
            ? { ...student, status: "", notes: "" }
            : student,
        ),
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Pencatatan Kehadiran Harian</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Picker */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="date-picker" className="text-sm font-medium">
                  Tanggal
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="outline"
                      className="w-full md:w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Class Selector */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="class-selector" className="text-sm font-medium">
                  Kelas
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger
                    id="class-selector"
                    className="w-full md:w-[200px]"
                  >
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 md:max-w-xs">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari siswa..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead className="w-[120px]">NISN</TableHead>
                  <TableHead className="w-[100px]">Hadir</TableHead>
                  <TableHead className="w-[100px]">Sakit</TableHead>
                  <TableHead className="w-[100px]">Izin</TableHead>
                  <TableHead className="w-[100px]">Alpa</TableHead>
                  <TableHead className="w-[100px]">Terlambat</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.nisn}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "present"}
                          onCheckedChange={() =>
                            handleStatusChange(student.id, "present")
                          }
                          className="mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "sick"}
                          onCheckedChange={() =>
                            handleStatusChange(student.id, "sick")
                          }
                          className="mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "permission"}
                          onCheckedChange={() =>
                            handleStatusChange(student.id, "permission")
                          }
                          className="mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "absent"}
                          onCheckedChange={() =>
                            handleStatusChange(student.id, "absent")
                          }
                          className="mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.status === "late"}
                          onCheckedChange={() =>
                            handleStatusChange(student.id, "late")
                          }
                          className="mx-auto"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Catatan kehadiran"
                          value={student.notes}
                          onChange={(e) =>
                            handleNotesChange(student.id, e.target.value)
                          }
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Tidak ada data siswa untuk kelas ini atau dengan kriteria
                      pencarian tersebut.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Kehadiran
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AttendanceRecorder;
