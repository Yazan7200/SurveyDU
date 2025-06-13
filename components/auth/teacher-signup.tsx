"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherSignup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Form submitted:", formData)
    router.push("/dashboard/teacher")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="w-full max-w-md mx-auto py-4 flex justify-center items-center border-b border-gray-300 mb-8">
        <Link href="/" className="flex items-center">
          <div className="bg-emerald-500 text-white p-2 rounded-md mr-2">
            <span className="font-bold">SurveyDU</span>
          </div>
        </Link>
      </header>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Teacher Sign Up</CardTitle>
            <CardDescription>Create your teacher account to manage surveys</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="w-1/2 space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الميكانيك العام">هندسة الميكانيك العام</SelectItem>
                    <SelectItem value="التصميم">هندسة التصميم الميكانيكي</SelectItem>
                    <SelectItem value="الطاقة">هندسة الطاقة الكهربائية</SelectItem>
                    <SelectItem value="الحواسيب">هندسة الحواسيب والأتمتة</SelectItem>
                    <SelectItem value="النسيجية">هندسة ميكانيك الصناعات النسيجية وتقاناتها</SelectItem>
                    <SelectItem value="السيارات">هندسة السيارات والآليات الثقيلة</SelectItem>
                    <SelectItem value="الالكترونيات">هندسة الالكترونيات والاتصالات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-emerald-500 hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>  
  )
}
