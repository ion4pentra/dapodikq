import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Users, BookOpen, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const ModuleCard = ({
  title = "Module Title",
  description = "Module description goes here",
  icon,
  color = "bg-blue-500",
  onClick,
}: ModuleCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className={cn("p-2 rounded-full", color)}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface ModuleCardsProps {
  modules?: ModuleCardProps[];
}

const ModuleCards = ({ modules }: ModuleCardsProps) => {
  const defaultModules: ModuleCardProps[] = [
    {
      title: "Manajemen Siswa",
      description: "Kelola data siswa, pendaftaran, dan profil",
      icon: <Users className="h-5 w-5 text-white" />,
      color: "bg-blue-500",
      onClick: () => (window.location.href = "/students"),
    },
    {
      title: "Sistem Absensi",
      description: "Catat dan pantau kehadiran siswa dan guru",
      icon: <Calendar className="h-5 w-5 text-white" />,
      color: "bg-green-500",
      onClick: () => (window.location.href = "/attendance"),
    },
    {
      title: "Integrasi Dapodik",
      description: "Ekspor dan impor data ke sistem Dapodik",
      icon: <BookOpen className="h-5 w-5 text-white" />,
      color: "bg-purple-500",
      onClick: () => (window.location.href = "/dapodik"),
    },
    {
      title: "Manajemen Pengguna",
      description: "Kelola akun pengguna dan hak akses",
      icon: <Settings className="h-5 w-5 text-white" />,
      color: "bg-orange-500",
      onClick: () => (window.location.href = "/users"),
    },
  ];

  const displayModules = modules || defaultModules;

  return (
    <div className="w-full bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Modul Utama</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayModules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
            color={module.color}
            onClick={module.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
