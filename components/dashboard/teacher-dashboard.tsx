"use client"

import { useState } from "react"
import {
  PlusCircle,
  BarChart2,
  MessageSquare,
  Settings,
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for surveys
const surveys = [
  {
    id: 1,
    title: "Course Evaluation: Advanced Programming",
    status: "active",
    responses: 24,
    targetAudience: "هندسة الحواسيب والاتمتة",
    createdAt: "2025-05-01",
    expiresAt: "2025-05-30",
    questions: 15,
  },
  {
    id: 2,
    title: "Teaching Methods Feedback",
    status: "active",
    responses: 18,
    targetAudience: "جميع الطلاب",
    createdAt: "2025-05-05",
    expiresAt: "2025-06-05",
    questions: 12,
  },
  {
    id: 3,
    title: "Laboratory Equipment Assessment",
    status: "draft",
    responses: 0,
    targetAudience: "هندسة الالكترونيات والاتصالات",
    createdAt: "2025-05-10",
    expiresAt: null,
    questions: 20,
  },
  {
    id: 4,
    title: "Research Project Interest Survey",
    status: "active",
    responses: 7,
    targetAudience: "الطلبة المتخرجون",
    createdAt: "2025-05-08",
    expiresAt: "2025-06-15",
    questions: 8,
  },
  {
    id: 5,
    title: "Academic Resources Evaluation",
    status: "draft",
    responses: 0,
    targetAudience: "جميع الطلاب",
    createdAt: "2025-05-12",
    expiresAt: null,
    questions: 10,
  },
]

export default function TeacherDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter surveys based on search query and status filter
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-500">Create and manage your surveys</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/teacher/profile">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/teacher/comments">
                <MessageSquare className="h-4 w-4" />
                Comments
              </Link>
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2" asChild>
              <Link href="/dashboard/teacher/create-survey">
                <PlusCircle className="h-4 w-4" />
                Create Survey
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <BarChart2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Responses</p>
                <h3 className="text-2xl font-bold">49</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <MessageSquare className="h-6 w-6 text-[#FF9814]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Comments</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Settings className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Surveys</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </CardContent>
          </Card>
        </div>

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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Surveys List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Surveys</CardTitle>
            <CardDescription>Manage and analyze your created surveys</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSurveys.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Responses</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Target Audience</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Expires</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSurveys.map((survey) => (
                      <tr key={survey.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{survey.title}</div>
                          <div className="text-sm text-gray-500">{survey.questions} questions</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`
                              ${survey.status === "active" ? "bg-green-50 text-green-600 border-green-200" : ""}
                              ${survey.status === "draft" ? "bg-gray-50 text-gray-600 border-gray-200" : ""}
                              ${survey.status === "expired" ? "bg-red-50 text-red-600 border-red-200" : ""}
                            `}
                          >
                            {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{survey.responses}</td>
                        <td className="py-3 px-4">{survey.targetAudience}</td>
                        <td className="py-3 px-4">
                          {survey.createdAt ? new Date(survey.createdAt).toLocaleDateString() : "-"}
                        </td>
                        <td className="py-3 px-4">
                          {survey.expiresAt ? new Date(survey.expiresAt).toLocaleDateString() : "-"}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart2 className="h-4 w-4 mr-2" />
                                View Results
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No surveys found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <Button className="bg-emerald-500 hover:bg-emerald-600">Create New Survey</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
