"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen } from "lucide-react"

export default function RoleSelection() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
  }

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/auth/${selectedRole.toLowerCase()}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">University Survey Platform</h1>
          <p className="mt-2 text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer transition-all ${
              selectedRole === "Student" ? "ring-2 ring-[#19P394] ring-emerald-500" : "hover:shadow-md"
            }`}
            onClick={() => handleRoleSelect("Student")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-emerald-500" />
              </div>
              <CardTitle className="mt-4">Student</CardTitle>
              <CardDescription>Participate in surveys and earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-emerald-100 text-emerald-500 p-1 rounded-full mr-2">✓</span>
                  Browse available surveys
                </li>
                <li className="flex items-center">
                  <span className="bg-emerald-100 text-emerald-500 p-1 rounded-full mr-2">✓</span>
                  Submit responses and earn points
                </li>
                <li className="flex items-center">
                  <span className="bg-emerald-100 text-emerald-500 p-1 rounded-full mr-2">✓</span>
                  Provide feedback through comments
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${
              selectedRole === "Teacher" ? "ring-2 ring-[#19P394] ring-emerald-500" : "hover:shadow-md"
            }`}
            onClick={() => handleRoleSelect("Teacher")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-[#FF9814]" />
              </div>
              <CardTitle className="mt-4">Teacher</CardTitle>
              <CardDescription>Create and manage surveys</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-orange-100 text-[#FF9814] p-1 rounded-full mr-2">✓</span>
                  Create and edit surveys
                </li>
                <li className="flex items-center">
                  <span className="bg-orange-100 text-[#FF9814] p-1 rounded-full mr-2">✓</span>
                  View responses and analytics
                </li>
                <li className="flex items-center">
                  <span className="bg-orange-100 text-[#FF9814] p-1 rounded-full mr-2">✓</span>
                  Moderate student comments
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
