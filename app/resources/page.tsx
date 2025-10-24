"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ResourcesContent } from "@/components/resources-content"

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ResourcesContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
