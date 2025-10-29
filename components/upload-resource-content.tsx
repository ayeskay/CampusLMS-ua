"use client"

import type React from "react"

import { useState } from "react"
import { getUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Upload, FileText } from "lucide-react"

interface UploadedResource {
  id: string
  title: string
  description: string
  type: string
  course: string
  status: "pending" | "approved" | "rejected"
  uploadedAt: string
}

export function UploadResourceContent() {
  const user = getUser()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "pdf",
    course: "CS101",
  })
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedResources, setUploadedResources] = useState<UploadedResource[]>([
    {
      id: "1",
      title: "Lecture Notes - Chapter 1",
      description: "Introduction to Computer Science",
      type: "pdf",
      course: "CS101",
      status: "approved",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Assignment 1 Solution",
      description: "Solution for assignment 1",
      type: "pdf",
      course: "CS101",
      status: "pending",
      uploadedAt: "2024-01-20",
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    if (!formData.title || !formData.description || !file) {
      setError("Please fill in all fields and select a file")
      setIsLoading(false)
      return
    }

    try {
      // TODO: In production, upload to Supabase Storage and create resource record
      const newResource: UploadedResource = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        course: formData.course,
        status: "pending",
        uploadedAt: new Date().toISOString().split("T")[0],
      }

      setUploadedResources((prev) => [newResource, ...prev])
      setFormData({
        title: "",
        description: "",
        type: "pdf",
        course: "CS101",
      })
      setFile(null)
      setSuccess("Resource uploaded successfully! Awaiting admin approval.")
    } catch (err) {
      setError("Failed to upload resource")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200 text-green-700"
      case "rejected":
        return "bg-red-50 border-red-200 text-red-700"
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-700"
      default:
        return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Upload Resource</h1>
        <p className="text-slate-600 mt-2">Share study materials with your classmates (subject to admin approval)</p>
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

      <Card className="p-6">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Resource Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Lecture Notes - Chapter 5"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the resource content..."
              disabled={isLoading}
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Resource Type</label>
              <Select value={formData.type} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Course</label>
              <Select
                value={formData.course}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, course: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">CS101 - Intro to CS</SelectItem>
                  <SelectItem value="CS201">CS201 - Data Structures</SelectItem>
                  <SelectItem value="CS301">CS301 - Web Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select File</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
                id="file-input"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-600">{file ? file.name : "Click to select or drag and drop"}</p>
                <p className="text-xs text-slate-500 mt-1">Max 50MB</p>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Resource"}
          </Button>
        </form>
      </Card>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Uploads</h2>
        {uploadedResources.length === 0 ? (
          <Card className="p-6 text-center text-slate-600">
            <FileText className="w-12 h-12 mx-auto mb-2 text-slate-400" />
            <p>No resources uploaded yet</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {uploadedResources.map((resource) => (
              <Card key={resource.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{resource.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{resource.description}</p>
                    <div className="flex gap-2 mt-2 text-xs text-slate-500">
                      <span>{resource.type}</span>
                      <span>•</span>
                      <span>{resource.course}</span>
                      <span>•</span>
                      <span>{resource.uploadedAt}</span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(resource.status)}`}
                  >
                    {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
