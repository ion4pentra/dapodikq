import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatisticsCards from "../components/dashboard/StatisticsCards";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import ModuleCards from "../components/dashboard/ModuleCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { CalendarDays, Users, BookOpen, Bell } from "lucide-react";

interface RecentActivityProps {
  activities?: Array<{
    id: string;
    type: string;
    title: string;
    time: string;
    description: string;
  }>;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [
    {
      id: "1",
      type: "student",
      title: "Pendaftaran Siswa Baru",
      time: "10 menit yang lalu",
      description: "Ahmad Rizky telah mendaftar sebagai siswa baru kelas 7A.",
    },
    {
      id: "2",
      type: "attendance",
      title: "Laporan Absensi",
      time: "30 menit yang lalu",
      description: "Laporan absensi kelas 8B telah diperbarui oleh Ibu Siti.",
    },
    {
      id: "3",
      type: "notification",
      title: "Pengumuman Rapat",
      time: "2 jam yang lalu",
      description:
        "Rapat guru akan diadakan pada hari Jumat, 15 September 2023.",
    },
    {
      id: "4",
      type: "document",
      title: "Dokumen Dapodik",
      time: "5 jam yang lalu",
      description: "Data Dapodik semester 1 telah berhasil diekspor.",
    },
  ],
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "student":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "attendance":
        return <CalendarDays className="h-5 w-5 text-green-500" />;
      case "document":
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      case "notification":
        return <Bell className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="mt-0.5 bg-gray-100 p-2 rounded-full">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard - Aplikasi Pendataan Sekolah</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Selamat datang, Administrator! Berikut adalah ringkasan data sekolah
            Anda.
          </p>
        </div>

        <StatisticsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        <ModuleCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Kalender Akademik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Mendatang</TabsTrigger>
                  <TabsTrigger value="past">Selesai</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4 mt-4">
                  <div className="flex items-start space-x-3 border-b border-gray-100 pb-3">
                    <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-md p-2 w-12 h-12">
                      <span className="text-xs font-bold">SEP</span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Rapat Guru</h4>
                      <p className="text-sm text-gray-600">
                        09:00 - 11:00, Ruang Rapat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border-b border-gray-100 pb-3">
                    <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-md p-2 w-12 h-12">
                      <span className="text-xs font-bold">SEP</span>
                      <span className="text-lg font-bold">20</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Ujian Tengah Semester</h4>
                      <p className="text-sm text-gray-600">
                        08:00 - 12:00, Semua Kelas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-md p-2 w-12 h-12">
                      <span className="text-xs font-bold">OKT</span>
                      <span className="text-lg font-bold">05</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Perayaan Hari Guru</h4>
                      <p className="text-sm text-gray-600">
                        13:00 - 15:00, Aula Sekolah
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="past" className="space-y-4 mt-4">
                  <div className="flex items-start space-x-3 border-b border-gray-100 pb-3">
                    <div className="flex flex-col items-center justify-center bg-gray-200 text-gray-700 rounded-md p-2 w-12 h-12">
                      <span className="text-xs font-bold">AGU</span>
                      <span className="text-lg font-bold">25</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-600">
                        Orientasi Siswa Baru
                      </h4>
                      <p className="text-sm text-gray-500">
                        08:00 - 15:00, Lapangan Sekolah
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex flex-col items-center justify-center bg-gray-200 text-gray-700 rounded-md p-2 w-12 h-12">
                      <span className="text-xs font-bold">AGU</span>
                      <span className="text-lg font-bold">10</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-600">
                        Pembagian Kelas
                      </h4>
                      <p className="text-sm text-gray-500">
                        09:00 - 11:00, Semua Kelas
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Statistik Pendaftaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kelas 7</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>150/200 siswa</span>
                    <span>Target: 200</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kelas 8</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>180/200 siswa</span>
                    <span>Target: 200</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kelas 9</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>190/200 siswa</span>
                    <span>Target: 200</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
