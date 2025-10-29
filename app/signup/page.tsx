"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    useCustomId: false,
    customUserId: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Full name, email, and password are required")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    if (formData.useCustomId && !formData.customUserId) {
      setError("Please enter a custom user ID")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          studentId: formData.studentId,
          password: formData.password,
          useCustomId: formData.useCustomId,
          customUserId: formData.customUserId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Signup failed")
        return
      }

      setSuccess("Account created successfully! Redirecting to login...")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">CampusLMS</h1>
          <p className="text-slate-600">Create Your Account</p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@university.edu"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-slate-700 mb-2">
                Student ID (Optional)
              </label>
              <Input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="STU123456"
                value={formData.studentId}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  name="useCustomId"
                  checked={formData.useCustomId}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-slate-700">Create custom user ID</span>
              </label>

              {formData.useCustomId && (
                <Input
                  id="customUserId"
                  name="customUserId"
                  type="text"
                  placeholder="e.g., john_doe_2024"
                  value={formData.customUserId}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mb-4"
                />
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="text-slate-900 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </Card>

        <Card className="mt-6 p-4 bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-900 font-medium mb-2">Demo Admin Account:</p>
          <p className="text-sm text-blue-800">Email: admin@campus.edu</p>
          <p className="text-sm text-blue-800">Password: admin123</p>
        </Card>
      </div>
    </div>
  )
}
