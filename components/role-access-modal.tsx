"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface RoleAccessModalProps {
  isOpen: boolean
  onClose: () => void
  targetRole: string
  currentRole: string
  onAccessGranted: () => void
}

export function RoleAccessModal({ isOpen, onClose, targetRole, currentRole, onAccessGranted }: RoleAccessModalProps) {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [accessDuration, setAccessDuration] = useState("1hour")
  const [accessPurpose, setAccessPurpose] = useState("")

  // Define role hierarchy and access requirements with exact role names
  const roleHierarchy = {
    "Guest/Viewer": 0,
    "Employee (Reader)": 1,
    Contributor: 2,
    "Reviewer/Moderator": 3,
    Admin: 4,
  }

  const roleRequirements = {
    Admin: {
      password: "admin123",
      description: "Requires administrative credentials",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    "Reviewer/Moderator": {
      password: "reviewer123",
      description: "Requires reviewer authorization",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    Contributor: {
      password: "contributor123",
      description: "Requires contributor access",
      icon: Lock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  }

  const currentRoleLevel = roleHierarchy[currentRole as keyof typeof roleHierarchy] || 0
  const targetRoleLevel = roleHierarchy[targetRole as keyof typeof roleHierarchy] || 0
  const requirement = roleRequirements[targetRole as keyof typeof roleRequirements]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!accessPurpose.trim()) {
      setError("Please provide a purpose for this role access")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate authentication check
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (requirement && password === requirement.password) {
      // Log the role access grant
      console.log("🔓 Role access granted:", {
        fromRole: currentRole,
        toRole: targetRole,
        duration: accessDuration,
        purpose: accessPurpose,
        grantedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + getDurationInMs(accessDuration)).toISOString(),
      })

      // Show success message with expiry info
      alert(
        `✅ Role access granted!\n\nRole: ${targetRole}\nDuration: ${accessDuration}\nExpires: ${new Date(Date.now() + getDurationInMs(accessDuration)).toLocaleString()}\n\nPurpose: ${accessPurpose}`,
      )

      onAccessGranted()
      onClose()
      setPassword("")
      setAccessPurpose("")
    } else {
      setError("Invalid credentials. Access denied.")
    }

    setIsLoading(false)
  }

  // Helper function to convert duration to milliseconds
  const getDurationInMs = (duration: string) => {
    const durations: { [key: string]: number } = {
      "30min": 30 * 60 * 1000,
      "1hour": 60 * 60 * 1000,
      "2hours": 2 * 60 * 60 * 1000,
      "4hours": 4 * 60 * 60 * 1000,
      "8hours": 8 * 60 * 60 * 1000,
      "24hours": 24 * 60 * 60 * 1000,
    }
    return durations[duration] || 60 * 60 * 1000 // Default to 1 hour
  }

  const canAccess = () => {
    // Allow switching to lower or equal roles without authentication
    if (targetRoleLevel <= currentRoleLevel) {
      return true
    }
    // Higher roles require authentication
    return false
  }

  if (canAccess()) {
    // Auto-grant access for same or lower level roles
    setTimeout(() => {
      onAccessGranted()
      onClose()
    }, 100)
    return null
  }

  if (!requirement) {
    // No special requirements for this role
    setTimeout(() => {
      onAccessGranted()
      onClose()
    }, 100)
    return null
  }

  const IconComponent = requirement.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`w-5 h-5 ${requirement.color}`} />
            Role Access Required
          </DialogTitle>
          <DialogDescription>
            You are requesting access to switch from{" "}
            <Badge variant="outline" className="mx-1">
              {currentRole}
            </Badge>
            to{" "}
            <Badge variant="outline" className="mx-1">
              {targetRole}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className={`p-4 rounded-lg ${requirement.bgColor} border border-gray-200`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-5 h-5 ${requirement.color}`} />
            <div>
              <p className={`font-medium ${requirement.color}`}>Authentication Required</p>
              <p className="text-sm text-gray-600">{requirement.description}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rolePassword">Access Password</Label>
            <Input
              id="rolePassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter role access password"
              disabled={isLoading}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessDuration">Access Duration</Label>
            <Select value={accessDuration} onValueChange={setAccessDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30min">30 Minutes</SelectItem>
                <SelectItem value="1hour">1 Hour</SelectItem>
                <SelectItem value="2hours">2 Hours</SelectItem>
                <SelectItem value="4hours">4 Hours</SelectItem>
                <SelectItem value="8hours">8 Hours (Full Day)</SelectItem>
                <SelectItem value="24hours">24 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessPurpose">Purpose for Role Access</Label>
            <Textarea
              id="accessPurpose"
              placeholder="Briefly explain why you need this role access..."
              value={accessPurpose}
              onChange={(e) => setAccessPurpose(e.target.value)}
              className="min-h-[60px]"
              required
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Demo Passwords:</strong>
            </p>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              <li>• Admin: admin123</li>
              <li>• Reviewer: reviewer123</li>
              <li>• Contributor: contributor123</li>
            </ul>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!password || !accessPurpose.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isLoading ? "Verifying..." : "Grant Access"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
