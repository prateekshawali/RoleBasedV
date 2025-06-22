"use client"

import { useState } from "react"
import { ChevronDown, Crown, Edit, Eye, User, Settings, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SimpleRoleSwitcherProps {
  currentRole: number
  userRoles: string[]
  onRoleChange: (roleIndex: number) => void
  onRequestElevation: () => void
  onRequestAccess: (targetRole: string, targetIndex: number) => void
}

export function SimpleRoleSwitcher({
  currentRole,
  userRoles,
  onRoleChange,
  onRequestElevation,
  onRequestAccess,
}: SimpleRoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  console.log("🎭 SimpleRoleSwitcher render:", { currentRole, userRoles, isOpen })

  const roleIcons = [User, Edit, Eye, Settings, User]
  const roleColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-gray-500"]

  const handleToggle = () => {
    console.log("🔽 Toggle dropdown:", !isOpen)
    setIsOpen(!isOpen)
  }

  const handleRoleClick = (index: number) => {
    console.log("🎯 Role clicked:", index)
    setIsOpen(false)

    if (index === currentRole) {
      console.log("ℹ️ Same role selected")
      return
    }

    const targetRole = userRoles[index]
    const currentRoleName = userRoles[currentRole]

    // Define role hierarchy levels
    const roleHierarchy = {
      "Guest/Viewer": 0,
      "Employee (Reader)": 1,
      Contributor: 2,
      "Reviewer/Moderator": 3,
      Admin: 4,
    }

    const currentLevel = roleHierarchy[currentRoleName as keyof typeof roleHierarchy] || 0
    const targetLevel = roleHierarchy[targetRole as keyof typeof roleHierarchy] || 0

    if (targetLevel > currentLevel) {
      console.log("🔐 Higher role requested")
      onRequestAccess(targetRole, index)
    } else {
      console.log("✅ Direct role change")
      onRoleChange(index)
    }
  }

  const handleElevationClick = () => {
    console.log("👑 Elevation requested")
    setIsOpen(false)
    onRequestElevation()
  }

  // Close dropdown when clicking outside
  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  if (!userRoles || userRoles.length === 0) {
    return (
      <Button variant="outline" disabled>
        No Roles Available
      </Button>
    )
  }

  if (currentRole < 0 || currentRole >= userRoles.length) {
    return (
      <Button variant="outline" disabled>
        Invalid Role
      </Button>
    )
  }

  const CurrentIcon = roleIcons[currentRole] || User
  const currentRoleName = userRoles[currentRole] || "Unknown Role"

  return (
    <div className="relative">
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={handleBackdropClick} />}

      {/* Trigger Button */}
      <Button variant="outline" className="gap-2 min-w-[200px] justify-start" onClick={handleToggle}>
        <CurrentIcon className="w-4 h-4" />
        <span className="flex-1 text-left">{currentRoleName}</span>
        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2">Switch Role</div>
            {userRoles.map((role, index) => {
              const IconComponent = roleIcons[index] || User
              const roleHierarchy = {
                "Guest/Viewer": 0,
                "Employee (Reader)": 1,
                Contributor: 2,
                "Reviewer/Moderator": 3,
                Admin: 4,
              }

              const currentLevel = roleHierarchy[userRoles[currentRole] as keyof typeof roleHierarchy] || 0
              const targetLevel = roleHierarchy[role as keyof typeof roleHierarchy] || 0
              const requiresAuth = targetLevel > currentLevel

              return (
                <div
                  key={index}
                  onClick={() => handleRoleClick(index)}
                  className={`flex items-center gap-2 hover:bg-gray-50 cursor-pointer p-2 rounded ${
                    currentRole === index ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${roleColors[index] || "bg-gray-500"}`} />
                  <IconComponent className="w-4 h-4" />
                  <span className="flex-1">{role}</span>
                  {requiresAuth && <Lock className="w-3 h-3 text-orange-500" />}
                  {currentRole === index && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Active
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
          <div className="border-t border-gray-200 mx-2" />
          <div
            onClick={handleElevationClick}
            className="flex items-center gap-2 text-orange-600 hover:bg-orange-50 cursor-pointer p-2 m-1 rounded"
          >
            <Crown className="w-4 h-4" />
            Request Role Elevation
          </div>
        </div>
      )}
    </div>
  )
}
