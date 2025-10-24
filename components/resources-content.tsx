"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Video, Download, Eye, Filter } from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "pdf" | "video" | "document"
  course: string
  courseCode: string
  uploadDate: string
  size?: string
  duration?: string
  downloads: number
  views: number
}

export function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  // Mock resources data
  const [resources] = useState<Resource[]>([
    {
      id: "1",
      title: "Introduction to Variables and Data Types",
      description: "Comprehensive guide on variables, data types, and type conversion in programming",
      type: "pdf",
      course: "Introduction to Programming",
      courseCode: "CS101",
      uploadDate: "2024-10-15",
      size: "2.4 MB",
      downloads: 45,
      views: 120,
    },
    {
      id: "2",
      title: "Python Loops Tutorial",
      description: "Video tutorial covering for loops, while loops, and loop control statements",
      type: "video",
      course: "Introduction to Programming",
      courseCode: "CS101",
      uploadDate: "2024-10-14",
      duration: "15:32",
      downloads: 32,
      views: 89,
    },
    {
      id: "3",
      title: "Functions and Scope",
      description: "Detailed document on function definition, parameters, return values, and scope",
      type: "document",
      course: "Introduction to Programming",
      courseCode: "CS101",
      uploadDate: "2024-10-13",
      size: "1.8 MB",
      downloads: 28,
      views: 76,
    },
    {
      id: "4",
      title: "Calculus II - Integration Techniques",
      description: "PDF notes on integration by parts, substitution, and partial fractions",
      type: "pdf",
      course: "Calculus II",
      courseCode: "MATH201",
      uploadDate: "2024-10-12",
      size: "3.1 MB",
      downloads: 52,
      views: 134,
    },
    {
      id: "5",
      title: "Differential Equations Lecture",
      description: "Video lecture on solving first-order and second-order differential equations",
      type: "video",
      course: "Calculus II",
      courseCode: "MATH201",
      uploadDate: "2024-10-11",
      duration: "42:15",
      downloads: 38,
      views: 95,
    },
    {
      id: "6",
      title: "Shakespeare's Sonnets Analysis",
      description: "Study guide analyzing themes, structure, and literary devices in Shakespeare's sonnets",
      type: "document",
      course: "English Literature",
      courseCode: "ENG102",
      uploadDate: "2024-10-10",
      size: "2.2 MB",
      downloads: 41,
      views: 108,
    },
    {
      id: "7",
      title: "Romantic Era Poetry",
      description: "Comprehensive PDF covering major poets and works of the Romantic era",
      type: "pdf",
      course: "English Literature",
      courseCode: "ENG102",
      uploadDate: "2024-10-09",
      size: "2.8 MB",
      downloads: 35,
      views: 92,
    },
    {
      id: "8",
      title: "Literary Criticism Methods",
      description: "Video tutorial on different approaches to literary analysis and criticism",
      type: "video",
      course: "English Literature",
      courseCode: "ENG102",
      uploadDate: "2024-10-08",
      duration: "28:45",
      downloads: 29,
      views: 71,
    },
  ])

  const courses = Array.from(new Set(resources.map((r) => r.courseCode)))
  const types = ["pdf", "video", "document"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.courseCode.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !selectedType || resource.type === selectedType
    const matchesCourse = !selectedCourse || resource.courseCode === selectedCourse

    return matchesSearch && matchesType && matchesCourse
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />
      case "document":
        return <FileText className="w-5 h-5 text-green-500" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Resource Repository</h1>
        <p className="text-slate-600">Browse and download educational materials for your courses</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search resources by title, description, or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={selectedType === type ? "bg-slate-900" : ""}
                >
                  {getTypeLabel(type)}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <Button
                  key={course}
                  variant={selectedCourse === course ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCourse(selectedCourse === course ? null : course)}
                  className={selectedCourse === course ? "bg-slate-900" : ""}
                >
                  {course}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Resources Grid */}
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Showing {filteredResources.length} of {resources.length} resources
        </p>

        {filteredResources.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No resources found matching your criteria</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getResourceIcon(resource.type)}
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {resource.courseCode}
                      </Badge>
                      <h3 className="font-semibold text-slate-900 line-clamp-2">{resource.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{resource.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-4 border-b border-slate-200">
                  <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                  <span>{resource.type === "video" ? resource.duration : resource.size}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Eye className="w-4 h-4" />
                      <span>{resource.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Download className="w-4 h-4" />
                      <span>{resource.downloads}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
