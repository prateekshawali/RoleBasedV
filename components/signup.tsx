"use client"

import type React from "react"
import { useState } from "react"
import Hyperspeed from "./hyperspeed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SignupProps {
  onNavigate?: (view: "login" | "signup" | "reset-password") => void
}

export function Signup({ onNavigate }: SignupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    // Calculate password strength
    if (name === "password" && typeof value === "string") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 12.5
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5
    setPasswordStrength(Math.min(100, strength))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      console.log("Signup attempt:", {
        ...formData,
        password: "[HIDDEN]",
        confirmPassword: "[HIDDEN]",
      })

      alert("Account created successfully! (This is just a demo)")
    } catch (err) {
      setErrors({ submit: "Registration failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-yellow-500"
    if (passwordStrength < 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black py-8">
      <Hyperspeed preset="matrix" speed={1.5} density={120} color="#00ff00" />

      <Card className="w-full max-w-lg mx-4 bg-black/90 backdrop-blur-xl border-2 border-green-500/40 shadow-2xl shadow-green-500/20 relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              🚀 Join the Journey
            </h1>
            <p className="text-gray-400">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors.submit}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-green-400 font-medium">
                  First Name
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  disabled={isLoading}
                  className={`bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && <span className="text-red-400 text-xs">{errors.firstName}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-green-400 font-medium">
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  disabled={isLoading}
                  className={`bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && <span className="text-red-400 text-xs">{errors.lastName}</span>}
              </div>
            </div>

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
                className={`bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
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
                placeholder="Create a strong password"
                disabled={isLoading}
                className={`bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 ${errors.password ? "border-red-500" : ""}`}
              />
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Progress value={passwordStrength} className="flex-1 h-2" />
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength < 25
                          ? "text-red-400"
                          : passwordStrength < 50
                            ? "text-yellow-400"
                            : passwordStrength < 75
                              ? "text-blue-400"
                              : "text-green-400"
                      }`}
                    >
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && <span className="text-red-400 text-xs">{errors.password}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-green-400 font-medium">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                disabled={isLoading}
                className={`bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword}</span>}
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  disabled={isLoading}
                  className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
                />
                <Label htmlFor="acceptTerms" className="text-sm text-gray-400 leading-relaxed">
                  I agree to the{" "}
                  <button type="button" className="text-cyan-400 hover:text-cyan-300">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-cyan-400 hover:text-cyan-300">
                    Privacy Policy
                  </button>
                </Label>
              </div>
              {errors.acceptTerms && <span className="text-red-400 text-xs">{errors.acceptTerms}</span>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?
              <button
                onClick={() => onNavigate?.("login")}
                className="text-green-400 hover:text-green-300 ml-1 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">or sign up with</span>
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
