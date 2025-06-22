"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContributorDashboard } from "./components/contributor-dashboard"
import { ReviewerDashboard } from "./components/reviewer-dashboard"
import { EmployeeDashboard } from "./components/employee-dashboard"
import { AdminDashboard } from "./components/admin-dashboard"
import { GuestDashboard } from "./components/guest-dashboard"

export default function TestDashboardRouting() {
  const [currentRole, setCurrentRole] = useState(0)

  const roles = [
    { name: "Employee", index: 0, color: "bg-blue-500" },
    { name: "Contributor", index: 1, color: "bg-green-500" },
    { name: "Reviewer", index: 2, color: "bg-purple-500" },
    { name: "Admin", index: 3, color: "bg-red-500" },
    { name: "Guest", index: 4, color: "bg-gray-500" },
  ]

  const renderDashboard = () => {
    switch (currentRole) {
      case 0:
        return <EmployeeDashboard />
      case 1:
        return <ContributorDashboard />
      case 2:
        return <ReviewerDashboard />
      case 3:
        return <AdminDashboard />
      case 4:
        return <GuestDashboard />
      default:
        return <EmployeeDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Test Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">BrainBox - Dashboard Test</h1>
              <p className="text-sm text-gray-500">Testing Role-based Dashboards</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {roles.map((role) => (
              <Button
                key={role.index}
                onClick={() => setCurrentRole(role.index)}
                variant={currentRole === role.index ? "default" : "outline"}
                size="sm"
                className={currentRole === role.index ? `${role.color} text-white` : ""}
              >
                {role.name}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Current Role Indicator */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${roles[currentRole].color}`} />
              Currently Viewing: {roles[currentRole].name} Dashboard (Role Index: {currentRole})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a test page to verify that different dashboards are rendering correctly for each role. Click the
              role buttons above to switch between dashboards.
            </p>
          </CardContent>
        </Card>

        {/* Render the appropriate dashboard */}
        {renderDashboard()}
      </div>
    </div>
  )
}
