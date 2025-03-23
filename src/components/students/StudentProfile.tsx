import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Calendar,
  GraduationCap,
  Home,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface StudentProfileProps {
  student?: {
    id: string;
    name: string;
    nisn: string;
    class: string;
    grade: string;
    gender: string;
    birthDate: string;
    address: string;
    phone: string;
    email: string;
    photo?: string;
    status: "active" | "inactive" | "graduated";
    parents: {
      father: {
        name: string;
        occupation: string;
        phone: string;
        email: string;
      };
      mother: {
        name: string;
        occupation: string;
        phone: string;
        email: string;
      };
    };
    academicRecords: {
      semester: string;
      year: string;
      subjects: {
        name: string;
        score: number;
        grade: string;
      }[];
      average: number;
      rank: number;
    }[];
    attendanceHistory: {
      date: string;
      status: "present" | "absent" | "late" | "sick" | "permission";
      notes?: string;
    }[];
  };
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  // Default student data if none provided
  const defaultStudent = {
    id: "STD12345",
    name: "Budi Santoso",
    nisn: "1234567890",
    class: "IX-A",
    grade: "9",
    gender: "Laki-laki",
    birthDate: "2008-05-15",
    address: "Jl. Merdeka No. 123, Jakarta Selatan",
    phone: "081234567890",
    email: "budi.santoso@example.com",
    photo: "",
    status: "active" as const,
    parents: {
      father: {
        name: "Ahmad Santoso",
        occupation: "Pegawai Negeri",
        phone: "081234567891",
        email: "ahmad.santoso@example.com",
      },
      mother: {
        name: "Siti Rahayu",
        occupation: "Guru",
        phone: "081234567892",
        email: "siti.rahayu@example.com",
      },
    },
    academicRecords: [
      {
        semester: "Ganjil",
        year: "2022/2023",
        subjects: [
          { name: "Matematika", score: 85, grade: "B" },
          { name: "Bahasa Indonesia", score: 90, grade: "A" },
          { name: "Bahasa Inggris", score: 88, grade: "B" },
          { name: "IPA", score: 92, grade: "A" },
          { name: "IPS", score: 87, grade: "B" },
        ],
        average: 88.4,
        rank: 5,
      },
      {
        semester: "Genap",
        year: "2022/2023",
        subjects: [
          { name: "Matematika", score: 87, grade: "B" },
          { name: "Bahasa Indonesia", score: 92, grade: "A" },
          { name: "Bahasa Inggris", score: 90, grade: "A" },
          { name: "IPA", score: 94, grade: "A" },
          { name: "IPS", score: 89, grade: "B" },
        ],
        average: 90.4,
        rank: 3,
      },
    ],
    attendanceHistory: [
      { date: "2023-08-01", status: "present" },
      { date: "2023-08-02", status: "present" },
      { date: "2023-08-03", status: "sick", notes: "Demam" },
      { date: "2023-08-04", status: "present" },
      { date: "2023-08-07", status: "present" },
      { date: "2023-08-08", status: "late", notes: "Terlambat 15 menit" },
      { date: "2023-08-09", status: "present" },
      { date: "2023-08-10", status: "present" },
      { date: "2023-08-11", status: "permission", notes: "Urusan keluarga" },
      { date: "2023-08-14", status: "present" },
    ],
  };

  const studentData = student || defaultStudent;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "sick":
        return "bg-orange-100 text-orange-800";
      case "permission":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Student Profile Card */}
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{studentData.name}</CardTitle>
                <CardDescription>NISN: {studentData.nisn}</CardDescription>
              </div>
              <Badge className={cn(getStatusColor(studentData.status))}>
                {studentData.status === "active"
                  ? "Aktif"
                  : studentData.status === "inactive"
                    ? "Tidak Aktif"
                    : "Lulus"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={studentData.photo} alt={studentData.name} />
                <AvatarFallback className="text-4xl">
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-medium">{studentData.class}</p>
                <p className="text-sm text-gray-500">
                  Kelas {studentData.grade}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Jenis Kelamin:</span>
                <span className="text-sm font-medium">
                  {studentData.gender}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Tanggal Lahir:</span>
                <span className="text-sm font-medium">
                  {formatDate(studentData.birthDate)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Home className="h-4 w-4 text-gray-500 mt-1" />
                <span className="text-sm text-gray-500">Alamat:</span>
                <span className="text-sm font-medium">
                  {studentData.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Telepon:</span>
                <span className="text-sm font-medium">{studentData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Email:</span>
                <span className="text-sm font-medium">{studentData.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
              <TabsTrigger value="academic">Akademik</TabsTrigger>
              <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
              <TabsTrigger value="parents">Orang Tua</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>
                    Detail informasi pribadi siswa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Nama Lengkap
                      </h3>
                      <p>{studentData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        NISN
                      </h3>
                      <p>{studentData.nisn}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Jenis Kelamin
                      </h3>
                      <p>{studentData.gender}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Tanggal Lahir
                      </h3>
                      <p>{formatDate(studentData.birthDate)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Alamat
                      </h3>
                      <p>{studentData.address}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Telepon
                      </h3>
                      <p>{studentData.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                      <p>{studentData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Kelas
                      </h3>
                      <p>{studentData.class}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Tingkat
                      </h3>
                      <p>Kelas {studentData.grade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Academic Records Tab */}
            <TabsContent value="academic" className="space-y-4">
              {studentData.academicRecords.map((record, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Semester {record.semester}</CardTitle>
                        <CardDescription>
                          Tahun Ajaran {record.year}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Rata-rata: {record.average.toFixed(1)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Peringkat: {record.rank}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mata Pelajaran</TableHead>
                          <TableHead className="text-right">Nilai</TableHead>
                          <TableHead className="text-right">Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {record.subjects.map((subject, subIndex) => (
                          <TableRow key={subIndex}>
                            <TableCell>{subject.name}</TableCell>
                            <TableCell className="text-right">
                              {subject.score}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline" className="font-medium">
                                {subject.grade}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Attendance History Tab */}
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Kehadiran</CardTitle>
                  <CardDescription>
                    10 catatan kehadiran terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Keterangan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentData.attendanceHistory.map(
                        (attendance, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(attendance.date)}</TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  getAttendanceStatusColor(attendance.status),
                                )}
                              >
                                {attendance.status === "present"
                                  ? "Hadir"
                                  : attendance.status === "absent"
                                    ? "Tidak Hadir"
                                    : attendance.status === "late"
                                      ? "Terlambat"
                                      : attendance.status === "sick"
                                        ? "Sakit"
                                        : "Izin"}
                              </Badge>
                            </TableCell>
                            <TableCell>{attendance.notes || "-"}</TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Parents/Guardian Tab */}
            <TabsContent value="parents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Orang Tua</CardTitle>
                  <CardDescription>
                    Detail informasi orang tua/wali siswa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Father's Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-medium">Ayah</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Nama
                          </h4>
                          <p>{studentData.parents.father.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Pekerjaan
                          </h4>
                          <p>{studentData.parents.father.occupation}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Telepon
                          </h4>
                          <p>{studentData.parents.father.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Email
                          </h4>
                          <p>{studentData.parents.father.email}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Mother's Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-5 w-5 text-pink-600" />
                        <h3 className="text-lg font-medium">Ibu</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Nama
                          </h4>
                          <p>{studentData.parents.mother.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Pekerjaan
                          </h4>
                          <p>{studentData.parents.mother.occupation}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Telepon
                          </h4>
                          <p>{studentData.parents.mother.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Email
                          </h4>
                          <p>{studentData.parents.mother.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
