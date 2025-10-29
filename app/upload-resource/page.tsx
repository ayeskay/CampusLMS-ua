"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UploadResourceContent } from "@/components/upload-resource-content"

export default function UploadResourcePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <UploadResourceContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
