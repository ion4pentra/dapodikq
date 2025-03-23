import React, { useState } from "react";
import { Helmet } from "react-helmet";
import UserTable from "@/components/users/UserTable";
import UserForm from "@/components/users/UserForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "staff";
  status: "active" | "inactive";
  lastLogin: string;
}

const UsersPage = () => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  // Mock data for demonstration
  const users: User[] = [
    {
      id: "1",
      name: "Ahmad Suparman",
      email: "ahmad.suparman@sekolah.edu",
      role: "admin",
      status: "active",
      lastLogin: "2023-06-15 08:30:22",
    },
    {
      id: "2",
      name: "Siti Rahayu",
      email: "siti.rahayu@sekolah.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2023-06-14 13:45:10",
    },
    {
      id: "3",
      name: "Budi Santoso",
      email: "budi.santoso@sekolah.edu",
      role: "staff",
      status: "inactive",
      lastLogin: "2023-05-30 09:15:33",
    },
    {
      id: "4",
      name: "Dewi Lestari",
      email: "dewi.lestari@sekolah.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2023-06-15 07:20:45",
    },
    {
      id: "5",
      name: "Eko Prasetyo",
      email: "eko.prasetyo@sekolah.edu",
      role: "staff",
      status: "active",
      lastLogin: "2023-06-13 14:50:18",
    },
  ];

  const handleEditUser = (user: User) => {
    // In a real application, this would update the user in the database
    console.log("Editing user:", user);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real application, this would delete the user from the database
    console.log("Deleting user with ID:", userId);
  };

  const handleResetPassword = (userId: string) => {
    // In a real application, this would trigger a password reset email
    console.log("Resetting password for user with ID:", userId);
  };

  const handleAddUser = (userData: any) => {
    // In a real application, this would add a new user to the database
    console.log("Adding new user:", userData);
    setIsAddUserDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Manajemen Pengguna | Sistem Pendataan Sekolah</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Manajemen Pengguna
        </h1>
        <p className="text-gray-600">
          Kelola akun pengguna sistem dan atur hak akses untuk berbagai peran
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Daftar Pengguna Sistem</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Menampilkan semua pengguna yang terdaftar dalam sistem
              </p>
            </div>
            <Dialog
              open={isAddUserDialogOpen}
              onOpenChange={setIsAddUserDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                </DialogHeader>
                <UserForm onSubmit={handleAddUser} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onResetPassword={handleResetPassword}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;
