"use client"

import { BookOpen, Bookmark, TrendingUp, Target, Clock, Star, Search, MessageCircle, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

export function EmployeeDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Consume & Learn
          </h1>
          <p className="text-gray-600 mt-1">Your learning dashboard</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200">
          <MessageCircle className="w-4 h-4 mr-2" />
          Ask a Question
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800">Need Different Access?</h3>
              <p className="text-sm text-blue-600">Request elevated role permissions for specific tasks</p>
            </div>
            <Button
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
              onClick={() => {
                // This will be handled by the parent component
                const event = new CustomEvent("requestRoleSwitch", {
                  detail: { currentRole: "Employee" },
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

      {/* Quick Search */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input placeholder="Search for articles, guides, or ask a question..." className="flex-1" />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Articles Read", value: "47", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Bookmarked", value: "12", icon: Bookmark, color: "text-green-600", bg: "bg-green-50" },
          { title: "Learning Streak", value: "15 days", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Time Saved", value: "8.5h", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
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
        {/* Personalized Learning Feed */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Trending in Your Domain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "React 18 New Features", category: "Frontend", readTime: "5 min", rating: 4.8 },
              { title: "API Security Best Practices", category: "Backend", readTime: "8 min", rating: 4.9 },
              { title: "Database Optimization Tips", category: "Database", readTime: "12 min", rating: 4.7 },
            ].map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <div>
                  <h4 className="font-medium">{article.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span>{article.readTime}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {article.rating}
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Read
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Path Progress */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Learning Path Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Master React Development", progress: 75, articles: "6/8 articles" },
              { title: "API Design Fundamentals", progress: 40, articles: "2/5 articles" },
              { title: "Database Optimization", progress: 90, articles: "9/10 articles" },
            ].map((path, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{path.title}</h4>
                  <span className="text-sm text-gray-600">{path.articles}</span>
                </div>
                <Progress value={path.progress} className="h-2" />
                <p className="text-sm text-gray-600">{path.progress}% complete</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Continue Reading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Advanced TypeScript Patterns", progress: 60, timeLeft: "8 min left" },
              { title: "Testing Strategies Guide", progress: 25, timeLeft: "15 min left" },
            ].map((article, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 cursor-pointer"
              >
                <h4 className="font-medium">{article.title}</h4>
                <Progress value={article.progress} className="h-2 mt-2" />
                <p className="text-sm text-gray-600 mt-1">{article.timeLeft}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
