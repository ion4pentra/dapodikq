import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AttendanceRecorder from "@/components/attendance/AttendanceRecorder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";

const AttendancePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Absensi
            </h1>
            <p className="text-muted-foreground">
              Kelola kehadiran siswa dan lihat laporan absensi
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Ekspor Data
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Impor Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="record" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="record">Pencatatan Kehadiran</TabsTrigger>
            <TabsTrigger value="summary">Ringkasan Kehadiran</TabsTrigger>
          </TabsList>

          <TabsContent value="record" className="mt-6">
            <AttendanceRecorder />
          </TabsContent>

          <TabsContent value="summary" className="mt-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Ringkasan Kehadiran</CardTitle>
                <CardDescription>
                  Lihat ringkasan kehadiran siswa berdasarkan kelas dan periode
                  waktu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-64 border rounded-md border-dashed">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center max-w-md">
                    Untuk melihat laporan kehadiran lengkap, silakan kunjungi
                    halaman Laporan Absensi
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/attendance/reports">Lihat Laporan Absensi</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
