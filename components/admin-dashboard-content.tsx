"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Trash2, Edit2, Check, X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface User {
  id: string
  fullName: string
  email: string
  studentId: string
  role: "student" | "admin"
  enrolledCourses: number
  joinedDate: string
}

interface PendingResource {
  id: string
  title: string
  description: string
  uploadedBy: string
  course: string
  type: string
  uploadedDate: string
  status: "pending" | "approved" | "rejected"
}

interface SystemStats {
  totalUsers: number
  totalStudents: number
  totalAdmins: number
  totalResources: number
  pendingApprovals: number
  totalCourses: number
}

export function AdminDashboardContent() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      fullName: "John Doe",
      email: "john@university.edu",
      studentId: "STU001",
      role: "student",
      enrolledCourses: 4,
      joinedDate: "2024-01-10",
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane@university.edu",
      studentId: "STU002",
      role: "student",
      enrolledCourses: 3,
      joinedDate: "2024-01-12",
    },
    {
      id: "3",
      fullName: "Admin User",
      email: "admin@university.edu",
      studentId: "ADM001",
      role: "admin",
      enrolledCourses: 0,
      joinedDate: "2024-01-01",
    },
  ])

  const [pendingResources, setPendingResources] = useState<PendingResource[]>([
    {
      id: "1",
      title: "Lecture Notes - Chapter 1",
      description: "Introduction to Computer Science",
      uploadedBy: "John Doe",
      course: "CS101",
      type: "pdf",
      uploadedDate: "2024-01-20",
      status: "pending",
    },
    {
      id: "2",
      title: "Assignment 1 Solution",
      description: "Solution for assignment 1",
      uploadedBy: "Jane Smith",
      course: "CS101",
      type: "pdf",
      uploadedDate: "2024-01-21",
      status: "pending",
    },
  ])

  const [stats] = useState<SystemStats>({
    totalUsers: 152,
    totalStudents: 150,
    totalAdmins: 2,
    totalResources: 45,
    pendingApprovals: 2,
    totalCourses: 12,
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleApproveResource = (resourceId: string) => {
    setPendingResources((prev) => prev.map((r) => (r.id === resourceId ? { ...r, status: "approved" } : r)))
    setSuccess("Resource approved successfully")
  }

  const handleRejectResource = (resourceId: string) => {
    setPendingResources((prev) => prev.map((r) => (r.id === resourceId ? { ...r, status: "rejected" } : r)))
    setSuccess("Resource rejected")
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
    setSuccess("User deleted successfully")
  }

  const handleChangeUserRole = (userId: string, newRole: "student" | "admin") => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    setSuccess(`User role changed to ${newRole}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-2">Manage users, resources, and system settings</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-600">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-600">Total Users</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalUsers}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Students</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalStudents}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Admins</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalAdmins}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Total Resources</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalResources}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Pending Approvals</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.pendingApprovals}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Total Courses</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalCourses}</p>
        </Card>
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources">Resource Approvals</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pending Resource Approvals</h2>
            {pendingResources.filter((r) => r.status === "pending").length === 0 ? (
              <p className="text-slate-600">No pending resources</p>
            ) : (
              <div className="space-y-4">
                {pendingResources
                  .filter((r) => r.status === "pending")
                  .map((resource) => (
                    <div key={resource.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{resource.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{resource.description}</p>
                          <div className="flex gap-2 mt-2 text-xs text-slate-500">
                            <span>By: {resource.uploadedBy}</span>
                            <span>•</span>
                            <span>{resource.course}</span>
                            <span>•</span>
                            <span>{resource.uploadedDate}</span>
                          </div>
                        </div>
                        <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          {resource.type}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApproveResource(resource.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectResource(resource.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">Approved Resources</h3>
              <div className="space-y-2">
                {pendingResources
                  .filter((r) => r.status === "approved")
                  .map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm text-slate-900">{resource.title}</span>
                      <span className="text-xs text-green-600">Approved</span>
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">User Management</h2>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{user.fullName}</h3>
                      <p className="text-sm text-slate-600">{user.email}</p>
                      <div className="flex gap-2 mt-2 text-xs text-slate-500">
                        <span>ID: {user.studentId}</span>
                        <span>•</span>
                        <span>Courses: {user.enrolledCourses}</span>
                        <span>•</span>
                        <span>Joined: {user.joinedDate}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded capitalize ${
                        user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {user.role === "student" ? (
                      <Button
                        onClick={() => handleChangeUserRole(user.id, "admin")}
                        size="sm"
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Make Admin
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleChangeUserRole(user.id, "student")}
                        size="sm"
                        variant="outline"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Make Student
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {user.fullName}? This action cannot be undone.
                        </AlertDialogDescription>
                        <div className="flex gap-2 justify-end">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Course Management</h2>
            <div className="space-y-3">
              {[
                { code: "CS101", name: "Introduction to Computer Science", students: 45 },
                { code: "CS201", name: "Data Structures", students: 38 },
                { code: "CS301", name: "Web Development", students: 32 },
                { code: "CS401", name: "Database Systems", students: 28 },
              ].map((course) => (
                <div key={course.code} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{course.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Code: {course.code} • Students: {course.students}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-300 bg-transparent">
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
