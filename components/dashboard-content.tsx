"use client"

import { getUser } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, BookOpen, FileText, Clock } from "lucide-react"

export function DashboardContent() {
  const user = getUser()

  const features = [
    {
      title: "Attendance",
      description: "View your attendance records and track absences",
      icon: BarChart3,
      href: "/attendance",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Resources",
      description: "Browse educational materials and course resources",
      icon: BookOpen,
      href: "/resources",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "My Notes",
      description: "Create and manage your personal study notes",
      icon: FileText,
      href: "/notes",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Schedule",
      description: "View your class schedule and upcoming events",
      icon: Clock,
      href: "#",
      color: "bg-orange-50 text-orange-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-slate-600">Here's what you can do today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.href} href={feature.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{feature.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View
                </Button>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <h2 className="text-xl font-bold mb-2">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-slate-300 text-sm">Attendance Rate</p>
            <p className="text-2xl font-bold">92%</p>
          </div>
          <div>
            <p className="text-slate-300 text-sm">Resources Accessed</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div>
            <p className="text-slate-300 text-sm">Notes Created</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
