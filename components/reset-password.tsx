"use client"

import type React from "react"
import { useState } from "react"
import Hyperspeed from "./hyperspeed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"

interface ResetPasswordProps {
  token?: string
  onSuccess?: () => void
  onNavigate?: (view: "login" | "signup" | "reset-password") => void
}

export function ResetPassword({ token, onSuccess, onNavigate }: ResetPasswordProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      setMessage("Password reset successful! Redirecting to login...")

      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (error) {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      <Hyperspeed preset="matrix" speed={1.5} density={120} color="#00ff00" />

      <Card className="w-full max-w-md mx-4 bg-black/90 backdrop-blur-xl border-2 border-green-500/40 shadow-2xl shadow-green-500/20 relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              🔐 Set New Password
            </h1>
            <p className="text-gray-400">Enter your new password below</p>
          </div>

          {message && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
                success
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span className="text-sm">{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-400 font-medium">
                New Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={loading || success}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-green-400 font-medium">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading || success}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={loading || success}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resetting...
                </div>
              ) : success ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Password Reset!
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate?.("login")}
              className="text-green-400 hover:text-green-300 text-sm transition-colors"
            >
              Back to Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
