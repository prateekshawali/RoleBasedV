"use client"

import type React from "react"
import { useState } from "react"
import Hyperspeed from "./hyperspeed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2, CheckCircle, Mail, ArrowLeft, Shield, Bug, Copy } from "lucide-react"

interface ForgotPasswordProps {
  onSuccess?: () => void
  onNavigate?: (view: "login" | "signup" | "reset-password") => void
}

type Step = "email" | "otp" | "password" | "success"

export function ForgotPassword({ onSuccess, onNavigate }: ForgotPasswordProps) {
  const [currentStep, setCurrentStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [resetToken, setResetToken] = useState("")
  const [isDemo, setIsDemo] = useState(false)
  const [demoOtp, setDemoOtp] = useState("")
  const [demoReason, setDemoReason] = useState("")
  const [showDebug, setShowDebug] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpTimer(60)
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Copy OTP to clipboard
  const copyOtpToClipboard = () => {
    navigator.clipboard.writeText(demoOtp)
    setMessage("OTP copied to clipboard!")
    setTimeout(() => setMessage(""), 2000)
  }

  // Step 1: Send OTP to email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setDebugInfo(data)

      if (data.success) {
        console.log("📧 OTP sent to:", email)
        setIsDemo(data.demo || false)
        setDemoOtp(data.demoOtp || "")
        setDemoReason(data.reason || "")

        if (data.demo) {
          setMessage(`Demo Mode: Your OTP is ${data.demoOtp}`)
        } else {
          setMessage(`OTP sent to ${email}. Please check your inbox.`)
        }

        setCurrentStep("otp")
        startOtpTimer()
      } else {
        setMessage(data.message || "Failed to send OTP. Please try again.")
      }
    } catch (error) {
      console.error("❌ Send OTP error:", error)
      setMessage("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()
      setDebugInfo(data)

      if (data.success) {
        console.log("✅ OTP verified:", otp)
        setMessage("OTP verified successfully!")
        setResetToken(data.resetToken)
        setCurrentStep("password")
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.")
      }
    } catch (error) {
      console.error("❌ Verify OTP error:", error)
      setMessage("Failed to verify OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Set new password
  const handleResetPassword = async (e: React.FormEvent) => {
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
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, resetToken, password }),
      })

      const data = await response.json()

      if (data.success) {
        console.log("🔐 Password reset for:", email)
        setCurrentStep("success")
        setMessage("Password reset successful!")

        // Auto-redirect after 3 seconds
        setTimeout(() => {
          if (onSuccess) onSuccess()
        }, 3000)
      } else {
        setMessage(data.message || "Failed to reset password. Please try again.")
      }
    } catch (error) {
      console.error("❌ Reset password error:", error)
      setMessage("Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOtp = async () => {
    if (otpTimer > 0) return

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setDebugInfo(data)

      if (data.success) {
        console.log("📧 OTP resent to:", email)
        setIsDemo(data.demo || false)
        setDemoOtp(data.demoOtp || "")

        if (data.demo) {
          setMessage(`Demo Mode: Your new OTP is ${data.demoOtp}`)
        } else {
          setMessage("OTP resent successfully!")
        }
        startOtpTimer()
      } else {
        setMessage(data.message || "Failed to resend OTP")
      }
    } catch (error) {
      console.error("❌ Resend OTP error:", error)
      setMessage("Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "email":
        return (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-400 font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={loading}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                required
              />
              <p className="text-xs text-gray-400">We'll send a 6-digit verification code to this email</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending OTP...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Verification Code
                </div>
              )}
            </Button>
          </form>
        )

      case "otp":
        return (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-green-400 font-medium">
                Verification Code
              </Label>
              <Input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit code"
                disabled={loading}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-400">Code sent to {email}</p>
            </div>

            {isDemo && demoOtp && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Demo Mode</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyOtpToClipboard}
                    className="text-blue-400 hover:text-blue-300 p-1"
                    title="Copy OTP"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-blue-900/30 rounded p-3 mb-2">
                  <div className="text-center">
                    <span className="text-2xl font-mono font-bold text-blue-300 tracking-wider">{demoOtp}</span>
                  </div>
                </div>
                <p className="text-xs text-blue-300">
                  <strong>Reason:</strong> {demoReason}
                </p>
                <p className="text-xs text-blue-300 mt-1">💡 Copy the code above or click the copy button</p>
              </div>
            )}

            {/* Debug Panel */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowDebug(!showDebug)}
                className="text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1"
              >
                <Bug className="w-3 h-3" />
                {showDebug ? "Hide" : "Show"} Debug Info
              </button>

              {showDebug && debugInfo && (
                <div className="bg-gray-900/50 border border-gray-700 rounded p-3 text-xs">
                  <div className="text-gray-400 mb-2">Debug Information:</div>
                  <pre className="text-green-400 whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
                  <div className="mt-2 text-gray-400">
                    <div>Current OTP: "{otp}"</div>
                    <div>OTP Length: {otp.length}</div>
                    <div>Email: {email}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setCurrentStep("email")}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Change Email
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={otpTimer > 0 || loading}
                className="text-green-400 hover:text-green-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend Code"}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        )

      case "password":
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
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
                disabled={loading}
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
                disabled={loading}
                className="bg-black/50 border-green-500/40 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resetting Password...
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Password Reset Successful!</h3>
              <p className="text-gray-400">
                Your password has been reset successfully. You can now login with your new password.
              </p>
            </div>
            <Button
              onClick={() => onNavigate?.("login")}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Back to Login
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "🔐 Forgot Password"
      case "otp":
        return "📧 Verify Email"
      case "password":
        return "🔑 Set New Password"
      case "success":
        return "✅ All Done!"
      default:
        return "🔐 Reset Password"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Enter your email to receive a verification code"
      case "otp":
        return "Enter the 6-digit code sent to your email"
      case "password":
        return "Create a new secure password"
      case "success":
        return "Your password has been reset successfully"
      default:
        return "Reset your password"
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      <Hyperspeed preset="matrix" speed={1.5} density={120} color="#00ff00" />

      <Card className="w-full max-w-md mx-4 bg-black/90 backdrop-blur-xl border-2 border-green-500/40 shadow-2xl shadow-green-500/20 relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-gray-400">{getStepDescription()}</p>
          </div>

          {/* Progress Indicator */}
          {currentStep !== "success" && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">
                  Step {currentStep === "email" ? 1 : currentStep === "otp" ? 2 : 3} of 3
                </span>
                <span className="text-xs text-gray-400">
                  {currentStep === "email" ? "Email" : currentStep === "otp" ? "Verify" : "Password"}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: currentStep === "email" ? "33%" : currentStep === "otp" ? "66%" : "100%",
                  }}
                ></div>
              </div>
            </div>
          )}

          {message && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
                message.includes("successful") || message.includes("sent") || message.includes("copied")
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {message.includes("successful") || message.includes("sent") || message.includes("copied") ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{message}</span>
            </div>
          )}

          {renderStepContent()}

          {currentStep !== "success" && (
            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate?.("login")}
                className="text-green-400 hover:text-green-300 text-sm transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
