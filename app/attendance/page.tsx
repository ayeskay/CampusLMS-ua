"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AttendanceContent } from "@/components/attendance-content"

export default function AttendancePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AttendanceContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
