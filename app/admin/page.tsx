"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/auth"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminDashboardContent } from "@/components/admin-dashboard-content"

export default function AdminPage() {
  const router = useRouter()
  const user = getUser()

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AdminDashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
