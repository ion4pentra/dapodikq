import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Users,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  School,
} from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatisticCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatisticCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div
            className={cn(
              "flex items-center text-xs mt-2",
              trend.isPositive ? "text-green-500" : "text-red-500",
            )}
          >
            <TrendingUp
              className={cn(
                "h-3 w-3 mr-1",
                !trend.isPositive && "transform rotate-180",
              )}
            />
            <span>{trend.value}% dari bulan lalu</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatisticsCardsProps {
  data?: {
    totalStudents: number;
    totalTeachers: number;
    attendanceRate: number;
    activeClasses: number;
    totalFacilities: number;
    academicAchievements: number;
  };
  className?: string;
}

const StatisticsCards = ({
  data = {
    totalStudents: 1250,
    totalTeachers: 78,
    attendanceRate: 92,
    activeClasses: 45,
    totalFacilities: 24,
    academicAchievements: 36,
  },
  className,
}: StatisticsCardsProps) => {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      <StatisticCard
        title="Total Siswa"
        value={data.totalStudents.toLocaleString()}
        description="Siswa terdaftar aktif"
        icon={<Users className="h-full w-full" />}
        trend={{ value: 3.2, isPositive: true }}
      />
      <StatisticCard
        title="Total Guru"
        value={data.totalTeachers.toString()}
        description="Guru dan staf pengajar"
        icon={<BookOpen className="h-full w-full" />}
        trend={{ value: 1.5, isPositive: true }}
      />
      <StatisticCard
        title="Tingkat Kehadiran"
        value={`${data.attendanceRate}%`}
        description="Rata-rata kehadiran harian"
        icon={<Calendar className="h-full w-full" />}
        trend={{ value: 0.8, isPositive: false }}
      />
      <StatisticCard
        title="Kelas Aktif"
        value={data.activeClasses.toString()}
        description="Kelas yang sedang berjalan"
        icon={<School className="h-full w-full" />}
      />
      <StatisticCard
        title="Fasilitas"
        value={data.totalFacilities.toString()}
        description="Total ruangan dan fasilitas"
        icon={<School className="h-full w-full" />}
        trend={{ value: 4.0, isPositive: true }}
      />
      <StatisticCard
        title="Prestasi Akademik"
        value={data.academicAchievements.toString()}
        description="Penghargaan tahun ini"
        icon={<Award className="h-full w-full" />}
        trend={{ value: 12.5, isPositive: true }}
      />
    </div>
  );
};

export default StatisticsCards;
