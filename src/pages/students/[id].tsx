import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentProfile from "../../components/students/StudentProfile";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface StudentData {
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
}

const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch student data
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        // For now, we'll simulate a delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock student data
        const mockStudent: StudentData = {
          id: id || "STD12345",
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
          status: "active",
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
            {
              date: "2023-08-11",
              status: "permission",
              notes: "Urusan keluarga",
            },
            { date: "2023-08-14", status: "present" },
          ],
        };

        setStudent(mockStudent);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleDelete = () => {
    // In a real application, this would be an API call to delete the student
    // For now, we'll just show an alert
    if (window.confirm("Are you sure you want to delete this student?")) {
      alert("Student deleted successfully");
      // Redirect to student list page would happen here
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/students">Back to Students</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header with navigation and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button asChild variant="outline" size="sm" className="mb-2">
            <Link to="/students">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Students
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Student Profile</h1>
          <p className="text-gray-500">View and manage student information</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/students/edit/${id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Student Profile Component */}
      {student && <StudentProfile student={student} />}
    </div>
  );
};

export default StudentDetailPage;
