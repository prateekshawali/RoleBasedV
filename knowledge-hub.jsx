"use client"

import { useState, useEffect } from "react"
import { AdminDashboard } from "./components/admin-dashboard"
import { ContributorDashboard } from "./components/contributor-dashboard"
import { EmployeeDashboard } from "./components/employee-dashboard"
import { ReviewerDashboard } from "./components/reviewer-dashboard"
import { GuestDashboard } from "./components/guest-dashboard"
import { RoleSwitcherFinal } from "./components/role-switcher-final"
import { RoleAccessModal } from "./components/role-access-modal"
import { RoleElevationModal } from "./components/role-elevation-modal"
import { Button } from "./components/ui/button"
import { LogOut, User } from "lucide-react"

export function KnowledgeHub({ initialRole = 0, onLogout }) {
  const [activeRole, setActiveRole] = useState(() => {
    const getValidRole = (role) => {
      if (typeof role === "number" && role >= 0 && role <= 4) {
        return role
      }
      console.warn("Invalid role provided:", role, "- defaulting to Employee (0)")
      return 0
    }
    return getValidRole(initialRole)
  })

  const [pendingRole, setPendingRole] = useState({ role: "", index: -1 })
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [showElevationModal, setShowElevationModal] = useState(false)

  const userRoles = ["Employee (Reader)", "Contributor", "Reviewer/Moderator", "Admin", "Guest/Viewer"]

  console.log("🏠 KnowledgeHub render:", { initialRole, activeRole, userRoles })

  // Handle role switch requests from dashboard components
  useEffect(() => {
    const handleRoleSwitchRequest = (event) => {
      console.log("🎭 Role switch request received:", event.detail)
      setShowElevationModal(true)
    }

    window.addEventListener("requestRoleSwitch", handleRoleSwitchRequest)
    return () => window.removeEventListener("requestRoleSwitch", handleRoleSwitchRequest)
  }, [])

  const handleRoleChange = (newRoleIndex) => {
    console.log("🔄 Role change:", { from: activeRole, to: newRoleIndex })
    if (newRoleIndex >= 0 && newRoleIndex < userRoles.length) {
      setActiveRole(newRoleIndex)
    } else {
      console.error("❌ Invalid role index:", newRoleIndex)
    }
  }

  const handleRequestAccess = (targetRole, targetIndex) => {
    console.log("🔐 Access request:", { targetRole, targetIndex, currentRole: userRoles[activeRole] })

    if (targetIndex < 0 || targetIndex >= userRoles.length) {
      console.error("❌ Invalid target role index:", targetIndex)
      return
    }

    setPendingRole({ role: targetRole, index: targetIndex })
    setShowAccessModal(true)
  }

  const handleAccessGranted = (roleIndex) => {
    console.log("✅ Access granted for role index:", roleIndex)

    if (roleIndex < 0 || roleIndex >= userRoles.length) {
      console.error("❌ Invalid role index in handleAccessGranted:", roleIndex)
      return
    }

    setActiveRole(roleIndex)
    setShowAccessModal(false)
    setPendingRole({ role: "", index: -1 })
  }

  const handleRequestElevation = () => {
    console.log("👑 Role elevation requested")
    setShowElevationModal(true)
  }

  const renderDashboard = () => {
    console.log("🎨 Rendering dashboard for role:", activeRole, userRoles[activeRole])

    switch (activeRole) {
      case 0:
        return <EmployeeDashboard />
      case 1:
        return <ContributorDashboard />
      case 2:
        return <ReviewerDashboard />
      case 3:
        return <AdminDashboard />
      case 4:
        return <GuestDashboard />
      default:
        console.error("❌ Unknown role index:", activeRole)
        return <EmployeeDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BB</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">BrainBox Knowledge Hub</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RoleSwitcherFinal
                currentRole={activeRole}
                userRoles={userRoles}
                onRoleChange={handleRoleChange}
                onRequestElevation={handleRequestElevation}
                onRequestAccess={handleRequestAccess}
              />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700">Demo User</span>
              </div>

              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderDashboard()}</main>

      {/* Modals */}
      <RoleAccessModal
        isOpen={showAccessModal}
        onClose={() => {
          setShowAccessModal(false)
          setPendingRole({ role: "", index: -1 })
        }}
        targetRole={pendingRole.role}
        targetRoleIndex={pendingRole.index}
        currentRole={userRoles[activeRole]}
        onAccessGranted={handleAccessGranted}
      />

      <RoleElevationModal
        isOpen={showElevationModal}
        onClose={() => setShowElevationModal(false)}
        currentRole={userRoles[activeRole]}
      />
    </div>
  )
}
