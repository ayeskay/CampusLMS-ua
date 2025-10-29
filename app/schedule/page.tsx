"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ScheduleContent } from "@/components/schedule-content"

export default function SchedulePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ScheduleContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
