"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Clock, Award, MessageSquare, Calendar, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Mock data for surveys
const surveys = [
  {
    id: 1,
    title: "Student Satisfaction Survey",
    department: "هندسة الحواسيب والأتمتة",
    points: 50,
    deadline: "2025-05-20",
    status: "available",
    questions: 15,
    estimatedTime: "10 min",
  },
  {
    id: 2,
    title: "Course Feedback: Introduction to Programming",
    department: "هندسة الحواسيب والأتمتة",
    points: 30,
    deadline: "2025-05-25",
    status: "available",
    questions: 10,
    estimatedTime: "5 min",
  },
  {
    id: 3,
    title: "Campus Facilities Evaluation",
    department: "هندسة الحواسيب والأتمتة",
    points: 40,
    deadline: "2025-05-18",
    status: "available",
    questions: 12,
    estimatedTime: "8 min",
  },
  {
    id: 4,
    title: "Library Services Feedback",
    department: "هندسة الحواسيب والأتمتة",
    points: 25,
    deadline: "2025-05-30",
    status: "available",
    questions: 8,
    estimatedTime: "4 min",
  },
  {
    id: 5,
    title: "Student Mental Health Assessment",
    department: "هندسة الحواسيب والأتمتة",
    points: 60,
    deadline: "2025-06-05",
    status: "available",
    questions: 20,
    estimatedTime: "15 min",
  },
]

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Filter surveys based on search query and department filter
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment =
      departmentFilter === "all" || survey.department.toLowerCase() === departmentFilter.toLowerCase()
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-500">Browse and participate in surveys</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-[#FF9814]" />
              <span className="font-medium">205 Points</span>
            </div>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/student/profile">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search surveys..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="health services">Health Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="mb-6">
          <TabsList>
            <TabsTrigger value="available">Available Surveys</TabsTrigger>
            <TabsTrigger value="completed">Completed Surveys</TabsTrigger>
            <TabsTrigger value="expired">Expired Surveys</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-4">
            {filteredSurveys.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredSurveys.map((survey) => (
                  <Card key={survey.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{survey.title}</CardTitle>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                          {survey.points} pts
                        </Badge>
                      </div>
                      <CardDescription>{survey.department}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col space-y-2 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Deadline: {new Date(survey.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>{survey.questions} questions</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Est. time: {survey.estimatedTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
                        <Link href={`/surveys/${survey.id}`}>Take Survey</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No surveys found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No completed surveys yet</h3>
              <p className="text-gray-500 mb-4">Start participating in available surveys to see them here</p>
              <Button variant="outline">View Available Surveys</Button>
            </div>
          </TabsContent>

          <TabsContent value="expired">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No expired surveys</h3>
              <p className="text-gray-500">Expired surveys will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
