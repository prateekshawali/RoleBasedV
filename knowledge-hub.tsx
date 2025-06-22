"use client"

import { useState, useEffect } from "react"
import { ContributorDashboard } from "./components/contributor-dashboard"
import { ReviewerDashboard } from "./components/reviewer-dashboard"
import { EmployeeDashboard } from "./components/employee-dashboard"
import { AdminDashboard } from "./components/admin-dashboard"
import { RoleElevationModal } from "./components/role-elevation-modal"
import { GuestDashboard } from "./components/guest-dashboard"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { RoleAccessModal } from "./components/role-access-modal"
import { RoleSwitcherFinal } from "./components/role-switcher-final"

interface KnowledgeHubProps {
  initialRole?: number
  onLogout?: () => void
}

export default function KnowledgeHub({ initialRole = 0, onLogout }: KnowledgeHubProps) {
  console.log("🏗️ KnowledgeHub render - initialRole:", initialRole)

  // Validate and normalize initialRole
  const getValidRole = (role: number) => {
    if (typeof role === "number" && role >= 0 && role <= 4) {
      return role
    }
    console.warn("⚠️ Invalid role provided:", role, "defaulting to 0")
    return 0
  }

  // Single source of truth for active role - initialize once and don't change based on props
  const [activeRole, setActiveRole] = useState(() => {
    const validRole = getValidRole(initialRole)
    console.log("🎯 Initial activeRole set to:", validRole)
    return validRole
  })

  const [showElevationModal, setShowElevationModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [pendingRole, setPendingRole] = useState({ name: "", index: -1 })

  // Handle role switch requests from dashboard buttons
  useEffect(() => {
    const handleRoleSwitchRequest = (event: CustomEvent) => {
      console.log("🔄 Role switch requested from dashboard:", event.detail)
      setShowElevationModal(true)
    }

    window.addEventListener("requestRoleSwitch", handleRoleSwitchRequest as EventListener)

    return () => {
      window.removeEventListener("requestRoleSwitch", handleRoleSwitchRequest as EventListener)
    }
  }, [])

  const userRoles = ["Employee (Reader)", "Contributor", "Reviewer/Moderator", "Admin", "Guest/Viewer"]
  const roleLabels = ["Employee (Reader)", "Contributor", "Reviewer/Moderator", "Admin", "Guest/Viewer"]

  const renderDashboard = () => {
    console.log("🎨 renderDashboard - activeRole:", activeRole)

    switch (activeRole) {
      case 0:
        return (
          <div>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium">🔵 Employee Dashboard (Role Index: 0)</p>
            </div>
            <EmployeeDashboard />
          </div>
        )
      case 1:
        return (
          <div>
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">🟢 Contributor Dashboard (Role Index: 1)</p>
            </div>
            <ContributorDashboard />
          </div>
        )
      case 2:
        return (
          <div>
            <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-purple-800 font-medium">🟣 Reviewer Dashboard (Role Index: 2)</p>
            </div>
            <ReviewerDashboard />
          </div>
        )
      case 3:
        return (
          <div>
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">🔴 Admin Dashboard (Role Index: 3)</p>
            </div>
            <AdminDashboard />
          </div>
        )
      case 4:
        return (
          <div>
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 font-medium">⚫ Guest Dashboard (Role Index: 4)</p>
            </div>
            <GuestDashboard />
          </div>
        )
      default:
        return (
          <div>
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">⚠️ Fallback Employee Dashboard (Invalid Role: {activeRole})</p>
            </div>
            <EmployeeDashboard />
          </div>
        )
    }
  }

  const handleRequestAccess = (targetRole: string, targetIndex: number) => {
    console.log("🔐 Access requested for role:", targetRole, "index:", targetIndex)

    if (targetIndex < 0 || targetIndex > 4) {
      console.error("❌ Invalid target role index:", targetIndex)
      return
    }

    if (!targetRole || targetRole.trim() === "") {
      console.error("❌ Invalid target role name:", targetRole)
      return
    }

    const newPendingRole = { name: targetRole, index: targetIndex }
    console.log("✅ Setting pending role:", newPendingRole)
    setPendingRole(newPendingRole)

    setTimeout(() => {
      console.log("✅ Opening access modal")
      setShowAccessModal(true)
    }, 50)
  }

  const handleAccessGranted = (grantedRoleIndex?: number) => {
    console.log("🔓 Access granted called with:", { grantedRoleIndex, pendingRole })

    const newRoleIndex = grantedRoleIndex !== undefined ? grantedRoleIndex : pendingRole.index

    if (newRoleIndex < 0 || newRoleIndex > 4) {
      console.error("❌ Invalid role index for access grant:", newRoleIndex)
      setPendingRole({ name: "", index: -1 })
      setShowAccessModal(false)
      return
    }

    console.log("✅ Setting activeRole to:", newRoleIndex)
    setActiveRole(newRoleIndex)

    setPendingRole({ name: "", index: -1 })
    setShowAccessModal(false)
  }

  const handleRoleChange = (newRoleIndex: number) => {
    console.log("🔄 Direct role change requested to:", newRoleIndex)
    if (newRoleIndex >= 0 && newRoleIndex <= 4) {
      console.log("✅ Setting activeRole to:", newRoleIndex)
      setActiveRole(newRoleIndex)
    } else {
      console.error("❌ Invalid role index:", newRoleIndex)
    }
  }

  const handleModalClose = () => {
    console.log("🚪 Access modal closing")
    setShowAccessModal(false)
    setPendingRole({ name: "", index: -1 })
  }

  const safeActiveRole = getValidRole(activeRole)
  if (safeActiveRole !== activeRole) {
    console.log("🔧 Correcting invalid activeRole from", activeRole, "to", safeActiveRole)
    setActiveRole(safeActiveRole)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">BrainBox</h1>
              <p className="text-sm text-gray-500">
                Knowledge Hub - {roleLabels[safeActiveRole]} (Index: {safeActiveRole})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcherFinal
              currentRole={safeActiveRole}
              userRoles={userRoles}
              onRoleChange={handleRoleChange}
              onRequestElevation={() => setShowElevationModal(true)}
              onRequestAccess={handleRequestAccess}
            />

            {onLogout && (
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">{renderDashboard()}</div>

      <RoleElevationModal
        isOpen={showElevationModal}
        onClose={() => setShowElevationModal(false)}
        currentRole={roleLabels[safeActiveRole]}
      />
      <RoleAccessModal
        isOpen={showAccessModal}
        onClose={handleModalClose}
        targetRole={pendingRole.name}
        targetRoleIndex={pendingRole.index}
        currentRole={roleLabels[safeActiveRole]}
        onAccessGranted={handleAccessGranted}
      />
    </div>
  )
}
