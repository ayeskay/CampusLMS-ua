"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NotesContent } from "@/components/notes-content"

export default function NotesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <NotesContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
