"use client"

import type React from "react"
import { useState } from "react"
import Hyperspeed from "./hyperspeed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

interface LoginProps {
  onLogin?: (role: string) => void
  onNavigate?: (view: "login" | "signup" | "reset-password") => void
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const userRoles = [
    { value: "guest", label: "Guest/Viewer", description: "Limited access to public content" },
    { value: "employee", label: "Employee", description: "Read and consume knowledge" },
    { value: "contributor", label: "Contributor", description: "Create and share content" },
    { value: "reviewer", label: "Reviewer", description: "Review and moderate content" },
    { value: "admin", label: "Admin", description: "Full system administration" },
  ]

  const handleInputChange = (name: string, value: string) => {
    console.log("📝 Login form input changed:", name, "=", value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🚀 Login form submitted with data:", formData)

    // Basic validation
    if (!formData.email || !formData.password || !formData.role) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("✅ Login successful, calling onLogin with role:", formData.role)

      // Call the onLogin callback with the selected role
      if (onLogin) {
        onLogin(formData.role)
      } else {
        console.error("❌ onLogin callback is not provided")
      }
    } catch (err) {
      console.error("❌ Login error:", err)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Hyperspeed Background */}
      <Hyperspeed preset="matrix" speed={1.5} density={120} color="#00ff00" />

      {/* Login Form Container */}
      <Card className="w-full max-w-md mx-4 bg-black/90 backdrop-blur-xl border-2 border-green-500/40 shadow-2xl shadow-green-500/20 relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              🚀 Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-400 font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-400 font-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-green-400 font-medium">
                Access Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => {
                  console.log("🎭 Role selected in dropdown:", value)
                  handleInputChange("role", value)
                }}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-black/50 border-green-500/40 text-white focus:border-green-400 focus:ring-green-400/20">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-black border-green-500/40">
                  {userRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value} className="text-white hover:bg-green-500/20">
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-xs text-gray-400">{role.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.role && (
                <div className="text-xs text-green-400">
                  Selected: {userRoles.find((r) => r.value === formData.role)?.label}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.("reset-password")}
                className="text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?
              <button
                onClick={() => onNavigate?.("signup")}
                className="text-green-400 hover:text-green-300 ml-1 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">or continue with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-black/50 border-green-500/40 text-white hover:bg-green-500/10">
                <span className="mr-2">📧</span> Google
              </Button>
              <Button variant="outline" className="bg-black/50 border-green-500/40 text-white hover:bg-green-500/10">
                <span className="mr-2">🐙</span> GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
