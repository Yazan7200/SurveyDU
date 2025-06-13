"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("surveys")
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard/teacher" className="flex items-center">
              <div className="bg-[#19P394] bg-emerald-500 text-white p-2 rounded-md mr-2">
                <span className="font-bold">SurveyDU</span>
              </div>
            </Link>
            <nav className="hidden md:flex ml-8 space-x-1">
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="gap-2" onClick={() => router.push("/dashboard/teacher")}>
            Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}
