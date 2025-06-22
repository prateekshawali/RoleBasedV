"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Crown, Edit, Eye, User, Settings, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RoleSwitcherProps {
  currentRole: number
  userRoles: string[]
  onRoleChange: (roleIndex: number) => void
  onRequestElevation: () => void
  onRequestAccess: (targetRole: string, targetIndex: number) => void
}

export function RoleSwitcherFinal({
  currentRole,
  userRoles,
  onRoleChange,
  onRequestElevation,
  onRequestAccess,
}: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  console.log("🎭 RoleSwitcherFinal render:", { currentRole, userRoles, isOpen })

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        console.log("🔒 Closing dropdown - clicked outside")
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        console.log("🔒 Closing dropdown - escape key")
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const roleIcons = [User, Edit, Eye, Settings, User]
  const roleColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-gray-500"]

  const handleToggle = () => {
    console.log("🔽 Toggle dropdown:", !isOpen)
    setIsOpen(!isOpen)
  }

  const handleRoleClick = (index: number) => {
    console.log("🎯 Role clicked:", { index, currentRole })

    setIsOpen(false) // Close dropdown immediately

    if (index < 0 || index >= userRoles.length) {
      console.error("❌ Invalid role index:", index)
      return
    }

    const targetRole = userRoles[index]
    if (!targetRole) {
      console.error("❌ No role found at index:", index)
      return
    }

    if (index === currentRole) {
      console.log("ℹ️ Same role selected")
      return
    }

    // Define role hierarchy
    const roleHierarchy = {
      "Guest/Viewer": 0,
      "Employee (Reader)": 1,
      Contributor: 2,
      "Reviewer/Moderator": 3,
      Admin: 4,
    }

    const currentLevel = roleHierarchy[userRoles[currentRole] as keyof typeof roleHierarchy] || 0
    const targetLevel = roleHierarchy[targetRole as keyof typeof roleHierarchy] || 0

    console.log("🔢 Role levels:", { currentLevel, targetLevel })

    if (targetLevel > currentLevel) {
      console.log("🔐 Higher role requested, requiring authentication")
      onRequestAccess(targetRole, index)
    } else {
      console.log("✅ Direct access granted")
      onRoleChange(index)
    }
  }

  const handleElevationClick = () => {
    console.log("👑 Role elevation requested")
    setIsOpen(false)
    onRequestElevation()
  }

  if (!userRoles || userRoles.length === 0 || currentRole < 0 || currentRole >= userRoles.length) {
    return (
      <Button variant="outline" disabled>
        Invalid Role
      </Button>
    )
  }

  const CurrentIcon = roleIcons[currentRole] || User
  const currentRoleName = userRoles[currentRole]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className="gap-2 min-w-[200px] justify-start"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="flex-1 text-left">{currentRoleName}</span>
        <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-2 px-2 font-medium">Switch Role</div>

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
                  <button
                    key={index}
                    onClick={() => handleRoleClick(index)}
                    className={`w-full flex items-center gap-2 p-2 rounded text-left hover:bg-gray-50 transition-colors ${
                      currentRole === index ? "bg-blue-50 border border-blue-200" : ""
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${roleColors[index] || "bg-gray-500"}`} />
                    <IconComponent className="w-4 h-4" />
                    <span className="flex-1 text-sm">{role}</span>
                    {requiresAuth && <Lock className="w-3 h-3 text-orange-500" />}
                    {currentRole === index && (
                      <Badge variant="secondary" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 my-1" />

            {/* Elevation Option */}
            <div className="p-2">
              <button
                onClick={handleElevationClick}
                className="w-full flex items-center gap-2 p-2 rounded text-left text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Crown className="w-4 h-4" />
                <span className="text-sm">Request Role Elevation</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
