"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Calendar, TrendingUp, AlertCircle } from "lucide-react"

interface AttendanceRecord {
  id: string
  courseCode: string
  courseName: string
  date: string
  status: "present" | "absent" | "late"
  time?: string
}

interface CourseStats {
  courseCode: string
  courseName: string
  total: number
  present: number
  absent: number
  late: number
  percentage: number
}

export function AttendanceContent() {
  // Mock attendance data
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { id: "1", courseCode: "CS101", courseName: "Introduction to Programming", date: "2024-10-20", status: "present" },
    { id: "2", courseCode: "CS101", courseName: "Introduction to Programming", date: "2024-10-18", status: "present" },
    {
      id: "3",
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      date: "2024-10-16",
      status: "late",
      time: "10:15 AM",
    },
    { id: "4", courseCode: "MATH201", courseName: "Calculus II", date: "2024-10-20", status: "present" },
    { id: "5", courseCode: "MATH201", courseName: "Calculus II", date: "2024-10-18", status: "absent" },
    { id: "6", courseCode: "MATH201", courseName: "Calculus II", date: "2024-10-16", status: "present" },
    { id: "7", courseCode: "ENG102", courseName: "English Literature", date: "2024-10-20", status: "present" },
    { id: "8", courseCode: "ENG102", courseName: "English Literature", date: "2024-10-18", status: "present" },
    { id: "9", courseCode: "ENG102", courseName: "English Literature", date: "2024-10-16", status: "present" },
  ])

  // Calculate course statistics
  const courseStats: CourseStats[] = [
    {
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      total: 3,
      present: 2,
      absent: 0,
      late: 1,
      percentage: 83,
    },
    {
      courseCode: "MATH201",
      courseName: "Calculus II",
      total: 3,
      present: 2,
      absent: 1,
      late: 0,
      percentage: 67,
    },
    {
      courseCode: "ENG102",
      courseName: "English Literature",
      total: 3,
      present: 3,
      absent: 0,
      late: 0,
      percentage: 100,
    },
  ]

  const overallStats = {
    totalClasses: attendanceRecords.length,
    present: attendanceRecords.filter((r) => r.status === "present").length,
    absent: attendanceRecords.filter((r) => r.status === "absent").length,
    late: attendanceRecords.filter((r) => r.status === "late").length,
  }

  const overallPercentage = Math.round(
    ((overallStats.present + overallStats.late * 0.5) / overallStats.totalClasses) * 100,
  )

  const chartData = courseStats.map((course) => ({
    name: course.courseCode,
    attendance: course.percentage,
  }))

  const pieData = [
    { name: "Present", value: overallStats.present },
    { name: "Late", value: overallStats.late },
    { name: "Absent", value: overallStats.absent },
  ]

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Attendance Tracking</h1>
        <p className="text-slate-600">View your attendance records across all courses</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Overall Attendance</p>
              <p className="text-3xl font-bold text-slate-900">{overallPercentage}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Present</p>
              <p className="text-3xl font-bold text-green-600">{overallStats.present}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Late</p>
              <p className="text-3xl font-bold text-yellow-600">{overallStats.late}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Absent</p>
              <p className="text-3xl font-bold text-red-600">{overallStats.absent}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Attendance by Course</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Overall Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Course Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Course Attendance Details</h2>
        {courseStats.map((course) => (
          <Card key={course.courseCode} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">{course.courseName}</h3>
                <p className="text-sm text-slate-600">{course.courseCode}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{course.percentage}%</p>
                <p className="text-sm text-slate-600">
                  {course.present}/{course.total} classes
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.percentage}%` }}></div>
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="text-green-600">Present: {course.present}</span>
              <span className="text-yellow-600">Late: {course.late}</span>
              <span className="text-red-600">Absent: {course.absent}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Records */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Attendance Records</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Time</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{record.courseCode}</p>
                        <p className="text-sm text-slate-600">{record.courseName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                    <td className="px-6 py-4 text-slate-600">{record.time || "09:00 AM"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
