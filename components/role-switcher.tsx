"use client"

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
  const roleIcons = [User, Edit, Eye, Settings, User]
  const roleColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-gray-500"]

  const handleRoleClick = (index: number) => {
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

    // If trying to access a higher role, require authentication
    if (targetLevel > currentLevel) {
      onRequestAccess(targetRole, index)
    } else {
      // Allow direct access to same or lower roles
      onRoleChange(index)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {(() => {
            const IconComponent = roleIcons[currentRole]
            return IconComponent ? <IconComponent className="w-4 h-4" /> : null
          })()}
          {userRoles[currentRole]}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white border border-gray-200 shadow-lg">
        {userRoles.map((role, index) => {
          const IconComponent = roleIcons[index]
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
              onClick={() => handleRoleClick(index)}
              className={`gap-2 hover:bg-gray-50 cursor-pointer ${currentRole === index ? "bg-blue-50" : ""}`}
            >
              <div className={`w-2 h-2 rounded-full ${roleColors[index]}`} />
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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onRequestElevation} className="gap-2 text-orange-600">
          <Crown className="w-4 h-4" />
          Request Role Elevation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
