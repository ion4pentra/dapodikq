import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../../lib/utils";

interface AttendanceData {
  date: string;
  percentage: number;
  present: number;
  absent: number;
  total: number;
}

interface AttendanceChartProps {
  data?: AttendanceData[];
  title?: string;
  description?: string;
}

const AttendanceChart = ({
  data = [
    { date: "Senin", percentage: 95, present: 190, absent: 10, total: 200 },
    { date: "Selasa", percentage: 92, present: 184, absent: 16, total: 200 },
    { date: "Rabu", percentage: 88, present: 176, absent: 24, total: 200 },
    { date: "Kamis", percentage: 91, present: 182, absent: 18, total: 200 },
    { date: "Jumat", percentage: 94, present: 188, absent: 12, total: 200 },
    { date: "Sabtu", percentage: 85, present: 170, absent: 30, total: 200 },
  ],
  title = "Statistik Kehadiran",
  description = "Persentase kehadiran siswa dalam seminggu terakhir",
}: AttendanceChartProps) => {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const [selectedClass, setSelectedClass] = useState<string>("all");

  // Find the highest percentage for scaling the chart
  const maxPercentage = Math.max(...data.map((item) => item.percentage));

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              <SelectItem value="1a">Kelas 1A</SelectItem>
              <SelectItem value="1b">Kelas 1B</SelectItem>
              <SelectItem value="2a">Kelas 2A</SelectItem>
              <SelectItem value="2b">Kelas 2B</SelectItem>
              <SelectItem value="3a">Kelas 3A</SelectItem>
            </SelectContent>
          </Select>
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "weekly" | "monthly")}
          >
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="weekly">Mingguan</TabsTrigger>
              <TabsTrigger value="monthly">Bulanan</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="weekly" className="mt-0">
          <div className="h-[300px] w-full">
            <div className="flex h-[250px] items-end justify-between gap-2 pt-6">
              {data.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative flex w-full flex-col items-center">
                    <div
                      className="w-12 bg-primary rounded-t-md transition-all duration-300 ease-in-out"
                      style={{
                        height: `${(day.percentage / 100) * 200}px`,
                        backgroundColor:
                          day.percentage > 90
                            ? "#10b981"
                            : day.percentage > 80
                              ? "#f59e0b"
                              : "#ef4444",
                      }}
                    />
                    <span className="absolute -top-6 text-xs font-medium">
                      {day.percentage}%
                    </span>
                  </div>
                  <span className="mt-2 text-sm">{day.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-green-500" />
                <span>
                  Hadir: {data.reduce((acc, day) => acc + day.present, 0)} siswa
                </span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-red-500" />
                <span>
                  Tidak Hadir: {data.reduce((acc, day) => acc + day.absent, 0)}{" "}
                  siswa
                </span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-gray-300" />
                <span>Total: {data[0]?.total || 0} siswa</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="mt-0">
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">
              Data bulanan akan ditampilkan di sini.
            </p>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
