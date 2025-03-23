import React from "react";
import RegistrationForm from "../../components/students/RegistrationForm";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface StudentRegistrationPageProps {
  // Props can be added here if needed
}

const StudentRegistrationPage: React.FC<StudentRegistrationPageProps> = () => {
  // This function would handle the form submission in a real implementation
  const handleRegistrationSubmit = (data: any) => {
    console.log("Registration data submitted:", data);
    // In a real implementation, this would send the data to an API
    // and handle success/error states
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Pendaftaran Siswa Baru
          </h1>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => window.history.back()}
            >
              Kembali
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <RegistrationForm onSubmit={handleRegistrationSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentRegistrationPage;
