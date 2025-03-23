import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import StudentsIndex from "./pages/students/index";
import StudentRegister from "./pages/students/register";
import StudentProfile from "./pages/students/[id]";
import AttendanceIndex from "./pages/attendance/index";
import AttendanceReports from "./pages/attendance/reports";
import DapodikIndex from "./pages/dapodik/index";
import UsersIndex from "./pages/users/index";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin"></div>
            <p className="mt-4 text-gray-600">Memuat aplikasi...</p>
          </div>
        </div>
      }
    >
      <>
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentsIndex />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/register"
            element={
              <ProtectedRoute requiredRoles={["admin", "teacher"]}>
                <StudentRegister />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <AttendanceIndex />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance/reports"
            element={
              <ProtectedRoute>
                <AttendanceReports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dapodik"
            element={
              <ProtectedRoute>
                <DapodikIndex />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRoles={["admin"]}>
                <UsersIndex />
              </ProtectedRoute>
            }
          />

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={null} />
          )}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <Toaster />
      </>
    </Suspense>
  );
}

export default App;
