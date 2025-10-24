"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import { getUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, BookOpen, BarChart3, FileText, Home } from "lucide-react"
import Link from "next/link"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const user = getUser()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/attendance", label: "Attendance", icon: BarChart3 },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/notes", label: "My Notes", icon: FileText },
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">CampusLMS</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4">
            {sidebarOpen && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Logged in as</p>
                <p className="text-sm font-medium truncate">{user?.name}</p>
              </div>
            )}
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
