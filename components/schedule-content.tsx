"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin } from "lucide-react"

interface ClassSchedule {
  id: string
  course: string
  courseCode: string
  day: string
  startTime: string
  endTime: string
  room: string
  instructor: string
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function ScheduleContent() {
  const [schedules] = useState<ClassSchedule[]>([
    {
      id: "1",
      course: "Introduction to Computer Science",
      courseCode: "CS101",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      room: "Room 101",
      instructor: "Dr. Smith",
    },
    {
      id: "2",
      course: "Introduction to Computer Science",
      courseCode: "CS101",
      day: "Wednesday",
      startTime: "09:00",
      endTime: "10:30",
      room: "Room 101",
      instructor: "Dr. Smith",
    },
    {
      id: "3",
      course: "Introduction to Computer Science",
      courseCode: "CS101",
      day: "Friday",
      startTime: "09:00",
      endTime: "10:30",
      room: "Room 101",
      instructor: "Dr. Smith",
    },
    {
      id: "4",
      course: "Data Structures",
      courseCode: "CS201",
      day: "Tuesday",
      startTime: "11:00",
      endTime: "12:30",
      room: "Room 205",
      instructor: "Dr. Johnson",
    },
    {
      id: "5",
      course: "Data Structures",
      courseCode: "CS201",
      day: "Thursday",
      startTime: "11:00",
      endTime: "12:30",
      room: "Room 205",
      instructor: "Dr. Johnson",
    },
  ])

  const getSchedulesForDay = (day: string) => {
    return schedules.filter((s) => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const getUpcomingClasses = () => {
    const today = new Date()
    const dayIndex = today.getDay()
    const todayName = DAYS_OF_WEEK[(dayIndex + 6) % 7] // Convert JS day index to our array

    const todayClasses = getSchedulesForDay(todayName)
    const upcomingClasses = todayClasses.filter((s) => {
      const [hours, minutes] = s.startTime.split(":").map(Number)
      const classTime = new Date()
      classTime.setHours(hours, minutes, 0)
      return classTime > today
    })

    return upcomingClasses.length > 0 ? upcomingClasses : todayClasses.slice(0, 2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Class Schedule</h1>
        <p className="text-slate-600 mt-2">View your course schedule and class timings</p>
      </div>

      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="week">Weekly View</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4">
          <div className="grid gap-4">
            {DAYS_OF_WEEK.map((day) => {
              const daySchedules = getSchedulesForDay(day)
              return (
                <Card key={day} className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-4">{day}</h3>
                  {daySchedules.length === 0 ? (
                    <p className="text-slate-500 text-sm">No classes scheduled</p>
                  ) : (
                    <div className="space-y-3">
                      {daySchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900">{schedule.course}</h4>
                              <p className="text-xs text-slate-600 mt-1">{schedule.courseCode}</p>
                            </div>
                            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>
                          <div className="flex gap-4 mt-3 text-xs text-slate-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {schedule.room}
                            </div>
                            <div>{schedule.instructor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Upcoming Classes</h3>
            </div>
            {getUpcomingClasses().length === 0 ? (
              <p className="text-blue-700">No upcoming classes today</p>
            ) : (
              <div className="space-y-3">
                {getUpcomingClasses().map((schedule) => (
                  <div key={schedule.id} className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{schedule.course}</h4>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {schedule.day}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{schedule.courseCode}</p>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {schedule.room}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">All Scheduled Classes</h3>
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium text-slate-900">{schedule.course}</p>
                    <p className="text-xs text-slate-600">{schedule.courseCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {schedule.day} {schedule.startTime}
                    </p>
                    <p className="text-xs text-slate-600">{schedule.room}</p>
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
