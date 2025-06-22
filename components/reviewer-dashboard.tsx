"use client"

import { Eye, Clock, Flag, Users, CheckCircle, AlertTriangle, FileText, Star, Activity, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ReviewerDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Validate & Improve Knowledge
          </h1>
          <p className="text-gray-600 mt-1">Your review dashboard</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200">
          <Eye className="w-4 h-4 mr-2" />
          Review Queue
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Pending Reviews", value: "12", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
          { title: "Completed Reviews", value: "89", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { title: "Flagged Content", value: "3", icon: Flag, color: "text-red-600", bg: "bg-red-50" },
          { title: "Review Rating", value: "4.9", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
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
        {/* Priority Review Queue */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Priority Review Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Security Best Practices", author: "John Doe", priority: "High", days: 3 },
              { title: "API Documentation", author: "Jane Smith", priority: "Medium", days: 1 },
              { title: "Code Review Guidelines", author: "Mike Johnson", priority: "High", days: 5 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    by {item.author} • {item.days} days ago
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.priority === "High" ? "destructive" : "secondary"}>{item.priority}</Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Review Performance */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Review Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Review Time</span>
                <span className="font-medium">2.3 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Approval Rate</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Feedback Quality</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.9</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">This Month's Progress</h4>
              <Progress value={78} className="h-2" />
              <p className="text-sm text-gray-600 mt-1">78% of monthly review target completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collaborative Reviews */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Collaborative Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Database Migration Guide", collaborator: "Sarah Wilson", status: "In Progress" },
              { title: "Frontend Architecture", collaborator: "Tom Brown", status: "Completed" },
            ].map((collab, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                <h4 className="font-medium">{collab.title}</h4>
                <p className="text-sm text-gray-600 mt-1">with {collab.collaborator}</p>
                <Badge variant="outline" className="mt-2">
                  {collab.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Approved", title: "Database Backup Procedures", time: "2 hours ago", type: "approved" },
              { action: "Rejected", title: "Outdated IT Policy", time: "4 hours ago", type: "rejected" },
              { action: "Published", title: "New Employee Handbook", time: "1 day ago", type: "published" },
              { action: "Feedback Sent", title: "Marketing Guidelines", time: "2 days ago", type: "feedback" },
            ].map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    action.type === "approved"
                      ? "bg-green-500"
                      : action.type === "rejected"
                        ? "bg-red-500"
                        : action.type === "published"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span
                      className={`${
                        action.type === "approved"
                          ? "text-green-600"
                          : action.type === "rejected"
                            ? "text-red-600"
                            : action.type === "published"
                              ? "text-blue-600"
                              : "text-yellow-600"
                      }`}
                    >
                      {action.action}
                    </span>{" "}
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-600">{action.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Review Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-1">Quality Standards</h4>
              <p className="text-sm text-blue-700">Ensure content meets accuracy and clarity requirements</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <h4 className="font-medium text-green-800 mb-1">Review Timeline</h4>
              <p className="text-sm text-green-700">Complete reviews within 48 hours of submission</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-1">Feedback Guidelines</h4>
              <p className="text-sm text-purple-700">Provide constructive and actionable feedback</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
