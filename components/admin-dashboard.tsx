"use client"

import {
  Shield,
  Users,
  Activity,
  AlertTriangle,
  BarChart3,
  Settings,
  Crown,
  FileText,
  RefreshCw,
  UserCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Manage, Monitor, and Maintain
          </h1>
          <p className="text-gray-600 mt-1">System administration dashboard</p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200">
          <Settings className="w-4 h-4 mr-2" />
          System Settings
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-red-800">Switch Role Context?</h3>
              <p className="text-sm text-red-600">Switch to different role perspective for testing or support</p>
            </div>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => {
                const event = new CustomEvent("requestRoleSwitch", {
                  detail: { currentRole: "Admin" },
                })
                window.dispatchEvent(event)
              }}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Switch Role
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Users", value: "1,247", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Active Sessions", value: "89", icon: Activity, color: "text-green-600", bg: "bg-green-50" },
          {
            title: "Pending Approvals",
            value: "12",
            icon: AlertTriangle,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
          { title: "System Health", value: "98%", icon: Shield, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Role Management Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-1" />
                Role Settings
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Crown className="w-4 h-4 mr-1" />
                Bulk Actions
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Role Elevation Requests */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  Role Elevation Requests
                  <Badge variant="secondary" className="ml-auto">
                    3 Pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    user: "John Doe",
                    from: "Employee",
                    to: "Contributor",
                    reason: "Wants to share expertise",
                    days: 2,
                  },
                  {
                    user: "Jane Smith",
                    from: "Contributor",
                    to: "Reviewer",
                    reason: "Cross-functional project",
                    days: 1,
                  },
                  { user: "Mike Johnson", from: "Employee", to: "Reviewer", reason: "Internship program", days: 3 },
                ].map((request, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div>
                      <h4 className="font-medium">{request.user}</h4>
                      <p className="text-sm text-gray-600">
                        {request.from} → {request.to} • {request.days} days ago
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{request.reason}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Role Sessions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Active Role Sessions
                  <Badge variant="secondary" className="ml-auto">
                    12 Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    user: "Alice Cooper",
                    role: "Admin",
                    originalRole: "Contributor",
                    timeLeft: "1h 23m",
                    purpose: "System maintenance",
                  },
                  {
                    user: "Bob Wilson",
                    role: "Reviewer",
                    originalRole: "Employee",
                    timeLeft: "45m",
                    purpose: "Document review",
                  },
                  {
                    user: "Carol Davis",
                    role: "Contributor",
                    originalRole: "Employee",
                    timeLeft: "2h 15m",
                    purpose: "Content creation",
                  },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200"
                  >
                    <div>
                      <h4 className="font-medium">{session.user}</h4>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{session.role}</span>
                        <span className="text-gray-400 mx-1">←</span>
                        <span>{session.originalRole}</span>
                      </p>
                      <p className="text-xs text-gray-500">{session.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">{session.timeLeft}</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Quality & User Engagement */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Content Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Articles Reviewed</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Average Rating</span>
                <span className="font-medium">4.6/5.0</span>
              </div>
              <Progress value={92} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Flagged Content</span>
                <span className="font-medium">2%</span>
              </div>
              <Progress value={2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              User Engagement Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-blue-50">
                <p className="text-2xl font-bold text-blue-600">89%</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-50">
                <p className="text-2xl font-bold text-green-600">4.2</p>
                <p className="text-sm text-gray-600">Avg. Session</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-50">
                <p className="text-2xl font-bold text-purple-600">23</p>
                <p className="text-sm text-gray-600">Top Contributors</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-orange-50">
                <p className="text-2xl font-bold text-orange-600">12%</p>
                <p className="text-sm text-gray-600">Bounce Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1">User Management</h3>
            <p className="text-sm text-gray-600">Manage users, roles, and permissions</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">Analytics</h3>
            <p className="text-sm text-gray-600">View detailed system analytics</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">System Settings</h3>
            <p className="text-sm text-gray-600">Configure system preferences</p>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution & System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { role: "Employees", count: 247, percentage: 76 },
              { role: "Contributors", count: 23, percentage: 7 },
              { role: "Reviewers", count: 8, percentage: 2 },
              { role: "Admins", count: 3, percentage: 1 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.role}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{item.count}</span>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              System Activity
            </CardTitle>
            <Button size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "New user registered", user: "Alice Cooper", time: "5 min ago", type: "user" },
              { action: "Article published", user: "John Smith", time: "15 min ago", type: "content" },
              { action: "Role updated", user: "Sarah Johnson", time: "1 hour ago", type: "admin" },
              { action: "System backup completed", user: "System", time: "2 hours ago", type: "system" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "user"
                      ? "bg-blue-500"
                      : activity.type === "content"
                        ? "bg-green-500"
                        : activity.type === "admin"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
