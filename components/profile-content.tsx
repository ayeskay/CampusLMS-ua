"use client"

import { useState, useEffect } from "react"
import { getUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Plus, X } from "lucide-react"

interface UserProfile {
  id: string
  fullName: string
  email: string
  studentId: string
  role: string
}

interface Course {
  id: string
  name: string
  code: string
  instructor: string
  credits: number
}

export function ProfileContent() {
  const user = getUser()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [availableCourses, setAvailableCourses] = useState<Course[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<UserProfile>>({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [newCourseCode, setNewCourseCode] = useState("")
  const [newCourseName, setNewCourseName] = useState("")
  const [newCourseInstructor, setNewCourseInstructor] = useState("")
  const [newCourseCredits, setNewCourseCredits] = useState("3")

  useEffect(() => {
    if (user) {
      setProfile({
        id: user.id,
        fullName: user.fullName || "Student",
        email: user.email || "",
        studentId: user.studentId || "",
        role: user.role || "student",
      })
      setEditData({
        fullName: user.fullName || "Student",
        email: user.email || "",
        studentId: user.studentId || "",
      })
      loadCourses()
    }
    setIsLoading(false)
  }, [user])

  const loadCourses = async () => {
    // Mock data - in production, fetch from Supabase
    const mockEnrolled: Course[] = [
      {
        id: "1",
        name: "Introduction to Computer Science",
        code: "CS101",
        instructor: "Dr. Smith",
        credits: 3,
      },
      {
        id: "2",
        name: "Data Structures",
        code: "CS201",
        instructor: "Dr. Johnson",
        credits: 4,
      },
    ]

    const mockAvailable: Course[] = [
      {
        id: "3",
        name: "Web Development",
        code: "CS301",
        instructor: "Dr. Williams",
        credits: 3,
      },
      {
        id: "4",
        name: "Database Systems",
        code: "CS401",
        instructor: "Dr. Brown",
        credits: 4,
      },
      {
        id: "5",
        name: "Artificial Intelligence",
        code: "CS501",
        instructor: "Dr. Davis",
        credits: 3,
      },
    ]

    setEnrolledCourses(mockEnrolled)
    setAvailableCourses(mockAvailable)
  }

  const handleSaveProfile = async () => {
    setError("")
    setSuccess("")

    try {
      // TODO: In production, update user profile in Supabase
      setProfile((prev) => (prev ? { ...prev, ...editData } : null))
      setIsEditing(false)
      setSuccess("Profile updated successfully")
    } catch (err) {
      setError("Failed to update profile")
    }
  }

  const handleEnrollCourse = (courseId: string) => {
    const course = availableCourses.find((c) => c.id === courseId)
    if (course) {
      setEnrolledCourses((prev) => [...prev, course])
      setAvailableCourses((prev) => prev.filter((c) => c.id !== courseId))
      setSuccess(`Enrolled in ${course.name}`)
    }
  }

  const handleDropCourse = (courseId: string) => {
    const course = enrolledCourses.find((c) => c.id === courseId)
    if (course) {
      setEnrolledCourses((prev) => prev.filter((c) => c.id !== courseId))
      setAvailableCourses((prev) => [...prev, course])
      setSuccess(`Dropped ${course.name}`)
    }
  }

  const handleAddNewCourse = () => {
    if (!newCourseCode || !newCourseName || !newCourseInstructor) {
      setError("Please fill in all course fields")
      return
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      code: newCourseCode,
      instructor: newCourseInstructor,
      credits: Number.parseInt(newCourseCredits),
    }

    setEnrolledCourses((prev) => [...prev, newCourse])
    setSuccess(`Added course ${newCourseCode}`)
    setNewCourseCode("")
    setNewCourseName("")
    setNewCourseInstructor("")
    setNewCourseCredits("3")
  }

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 mt-2">Manage your account and courses</p>
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

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                {isEditing ? (
                  <Input
                    value={editData.fullName || ""}
                    onChange={(e) => setEditData((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Full Name"
                  />
                ) : (
                  <p className="text-slate-900 font-medium">{profile?.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Email"
                  />
                ) : (
                  <p className="text-slate-900 font-medium">{profile?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Student ID</label>
                {isEditing ? (
                  <Input
                    value={editData.studentId || ""}
                    onChange={(e) => setEditData((prev) => ({ ...prev, studentId: e.target.value }))}
                    placeholder="Student ID"
                  />
                ) : (
                  <p className="text-slate-900 font-medium">{profile?.studentId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <p className="text-slate-900 font-medium capitalize">{profile?.role}</p>
              </div>

              <div className="flex gap-2 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" className="border-slate-300">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="bg-slate-900 hover:bg-slate-800">
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <Card className="p-6 text-center text-slate-600">
                <p>No courses enrolled yet</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{course.name}</h3>
                        <p className="text-sm text-slate-600">
                          {course.code} • {course.instructor} • {course.credits} credits
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDropCourse(course.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Drop
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Course</h2>
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Course Code</label>
                  <Input
                    placeholder="e.g., CS101"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Course Name</label>
                  <Input
                    placeholder="e.g., Introduction to Programming"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instructor</label>
                  <Input
                    placeholder="e.g., Dr. Smith"
                    value={newCourseInstructor}
                    onChange={(e) => setNewCourseInstructor(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Credits</label>
                  <Input
                    type="number"
                    placeholder="3"
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(e.target.value)}
                    min="1"
                    max="6"
                  />
                </div>
              </div>
              <Button onClick={handleAddNewCourse} className="bg-green-600 hover:bg-green-700 w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Available Courses</h2>
            {availableCourses.length === 0 ? (
              <Card className="p-6 text-center text-slate-600">
                <p>All available courses are enrolled</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {availableCourses.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{course.name}</h3>
                        <p className="text-sm text-slate-600">
                          {course.code} • {course.instructor} • {course.credits} credits
                        </p>
                      </div>
                      <Button
                        onClick={() => handleEnrollCourse(course.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Enroll
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
