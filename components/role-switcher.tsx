"use client"

import type React from "react"

import { ChevronDown, Crown, Edit, Eye, User, Settings, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface RoleSwitcherProps {
  currentRole: number
  userRoles: string[]
  onRoleChange: (roleIndex: number) => void
  onRequestElevation: () => void
  onRequestAccess: (targetRole: string, targetIndex: number) => void
}

export function RoleSwitcher({
  currentRole,
  userRoles,
  onRoleChange,
  onRequestElevation,
  onRequestAccess,
}: RoleSwitcherProps) {
  console.log("🎭 RoleSwitcher render:", { currentRole, userRoles })

  const roleIcons = [User, Edit, Eye, Settings, User]
  const roleColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-gray-500"]

  const handleRoleClick = (index: number, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    console.log("🎯 RoleSwitcher: Role clicked", {
      clickedIndex: index,
      currentRole,
      targetRole: userRoles[index],
      currentRoleName: userRoles[currentRole],
    })

    // Validate role index
    if (index < 0 || index >= userRoles.length) {
      console.error("❌ Invalid role index:", index, "Available roles:", userRoles.length)
      return
    }

    const targetRole = userRoles[index]
    const currentRoleName = userRoles[currentRole]

    if (!targetRole) {
      console.error("❌ No role found at index:", index)
      return
    }

    if (index === currentRole) {
      console.log("ℹ️ Same role selected, no action needed")
      return
    }

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

    console.log("🔢 Role levels:", { currentLevel, targetLevel, requiresAuth: targetLevel > currentLevel })

    // If trying to access a higher role, require authentication
    if (targetLevel > currentLevel) {
      console.log("🔐 Higher role requested, requiring authentication")
      onRequestAccess(targetRole, index)
    } else {
      // Allow direct access to same or lower roles
      console.log("✅ Direct access granted to same/lower role")
      onRoleChange(index)
    }
  }

  const handleElevationClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log("👑 Role elevation requested")
    onRequestElevation()
  }

  const handleTriggerClick = () => {
    console.log("🔽 Dropdown trigger clicked")
  }

  // Ensure we have valid data
  if (!userRoles || userRoles.length === 0) {
    console.error("❌ No user roles provided")
    return (
      <Button variant="outline" disabled>
        No Roles Available
      </Button>
    )
  }

  if (currentRole < 0 || currentRole >= userRoles.length) {
    console.error("❌ Invalid current role index:", currentRole)
    return (
      <Button variant="outline" disabled>
        Invalid Role
      </Button>
    )
  }

  const CurrentIcon = roleIcons[currentRole] || User
  const currentRoleName = userRoles[currentRole] || "Unknown Role"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 min-w-[200px] justify-start" onClick={handleTriggerClick}>
          <CurrentIcon className="w-4 h-4" />
          <span className="flex-1 text-left">{currentRoleName}</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white border border-gray-200 shadow-lg z-50" sideOffset={5}>
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
              <DropdownMenuItem
                key={index}
                onClick={(e) => handleRoleClick(index, e)}
                className={`gap-2 hover:bg-gray-50 cursor-pointer p-2 rounded ${
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
              </DropdownMenuItem>
            )
          })}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleElevationClick}
          className="gap-2 text-orange-600 hover:bg-orange-50 p-2 m-1 rounded"
        >
          <Crown className="w-4 h-4" />
          Request Role Elevation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
