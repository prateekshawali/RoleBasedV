"use client"

import { Clock, Search, Eye, Lock, UserPlus, AlertCircle, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function GuestDashboard() {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 45 * 60) // 2 hours 45 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours} hours ${minutes} minutes`
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Guest Access Banner */}
      <Card className="bg-gradient-to-r from-gray-700 to-gray-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Guest Access</h2>
              <p className="text-gray-200 mb-4">Limited access to public knowledge content.</p>
              <Badge className="bg-gray-600 hover:bg-gray-600 text-white">Guest View - Limited Public Access</Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-yellow-300 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Session expires in {formatTime(timeLeft)}</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Request Full Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Limited Access Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Limited Access Notice</p>
              <p className="text-sm text-yellow-700">
                You have guest access with limited permissions. Contact your administrator for full access.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Need Full Access?</h3>
              <p className="text-sm text-gray-600">Request elevated role permissions to access more features</p>
            </div>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const event = new CustomEvent("requestRoleSwitch", {
                  detail: { currentRole: "Guest" },
                })
                window.dispatchEvent(event)
              }}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Request Access
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Public Content */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Search Public Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Search public articles and resources..." className="flex-1" />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Company Info", "Safety", "Public Policies", "General Resources"].map((tag, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Content */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Available Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Company Overview", views: "1,234 views", category: "General", status: "Public" },
              { title: "Public Safety Guidelines", views: "856 views", category: "Safety", status: "Public" },
              { title: "Visitor Information", views: "432 views", category: "General", status: "Public" },
            ].map((content, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <div>
                  <h4 className="font-medium">{content.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{content.views}</span>
                    <Badge variant="secondary">{content.category}</Badge>
                    <Badge className="bg-green-100 text-green-800">{content.status}</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Permissions */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Your Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { permission: "View public articles", allowed: true },
              { permission: "Search public content", allowed: true },
              { permission: "Download public resources", allowed: true },
              { permission: "View private content", allowed: false },
              { permission: "Comment on articles", allowed: false },
              { permission: "Create content", allowed: false },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.permission}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.allowed ? "bg-green-500" : "bg-red-500"}`} />
                  <span className={`text-xs ${item.allowed ? "text-green-600" : "text-red-600"}`}>
                    {item.allowed ? "Allowed" : "Restricted"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Request Full Access */}
      <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <UserPlus className="w-5 h-5" />
            Request Full Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            Get access to the full knowledge base, create content, and collaborate with your team.
          </p>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">Request Employee Access</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Contact Administrator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
