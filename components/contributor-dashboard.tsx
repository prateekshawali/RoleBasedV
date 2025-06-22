"use client"

import { TrendingUp, Clock, Zap, Star, BookOpen, Users, Award, Plus, Send, BarChart3, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ContributorDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Create & Share Knowledge
          </h1>
          <p className="text-gray-600 mt-1">Your contribution dashboard</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200">
          <Zap className="w-4 h-4 mr-2" />
          Write with AI Assistant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Articles Published", value: "23", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Total Views", value: "1,247", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { title: "Reputation Score", value: "847", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
          { title: "Collaborations", value: "5", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
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
        {/* Content Performance */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Content Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "React Best Practices", views: 342, rating: 4.8, trend: "+12%" },
              { title: "API Design Guidelines", views: 289, rating: 4.6, trend: "+8%" },
              { title: "Database Optimization", views: 156, rating: 4.9, trend: "+15%" },
            ].map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div>
                  <h4 className="font-medium">{article.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{article.views} views</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {article.rating}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {article.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submission Progress */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Submission Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "TypeScript Advanced Guide", stage: "Under Review", progress: 75 },
              { title: "Testing Strategies", stage: "Draft", progress: 30 },
              { title: "Performance Optimization", stage: "Submitted", progress: 100 },
            ].map((submission, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{submission.title}</h4>
                  <Badge variant="outline">{submission.stage}</Badge>
                </div>
                <Progress value={submission.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reputation & Achievements */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Reputation & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Trusted Contributor</h3>
              <p className="text-gray-600">847 reputation points</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Next level: Expert</p>
              <Progress value={67} className="w-32 h-2 mt-1" />
            </div>
          </div>
          <div className="flex gap-2">
            {["Quality Writer", "Team Player", "Consistent", "Helpful"].map((badge, index) => (
              <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">New Article</h3>
            <p className="text-sm text-gray-600">Start writing a new knowledge article</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1">My Drafts</h3>
            <p className="text-sm text-gray-600">Continue working on saved drafts</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
              <Send className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">Submit for Review</h3>
            <p className="text-sm text-gray-600">Send completed articles for approval</p>
          </CardContent>
        </Card>
      </div>

      {/* My Articles & Writing Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                My Articles
              </CardTitle>
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-1" />
                New Article
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "API Integration Best Practices",
                  views: "145 views",
                  status: "published",
                  date: "3 days ago",
                },
                { title: "Database Optimization Guide", views: "89 views", status: "review", date: "1 week ago" },
                { title: "Frontend Performance Tips", views: "234 views", status: "published", date: "2 weeks ago" },
              ].map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <div>
                    <h4 className="font-medium">{article.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{article.views}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Writing Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Published Articles</span>
                <span className="font-bold text-2xl">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Views</span>
                <span className="font-bold text-2xl">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Articles in Review</span>
                <span className="font-bold text-2xl">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Draft Articles</span>
                <span className="font-bold text-2xl">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
