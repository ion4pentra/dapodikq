import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ReportGenerator from "../../components/attendance/ReportGenerator";

const AttendanceReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Attendance Reports
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Generate and view attendance reports for students by class, week,
              or month
            </span>
          </div>
        </div>

        <div className="bg-white">
          <ReportGenerator />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendanceReportsPage;
