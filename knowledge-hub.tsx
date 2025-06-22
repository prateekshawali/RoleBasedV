"use client"

import { useState, useEffect } from "react"
import { RoleSwitcher } from "./components/role-switcher"
import { ContributorDashboard } from "./components/contributor-dashboard"
import { ReviewerDashboard } from "./components/reviewer-dashboard"
import { EmployeeDashboard } from "./components/employee-dashboard"
import { AdminDashboard } from "./components/admin-dashboard"
import { RoleElevationModal } from "./components/role-elevation-modal"
import { GuestDashboard } from "./components/guest-dashboard"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { RoleAccessModal } from "./components/role-access-modal"

interface KnowledgeHubProps {
  initialRole?: number
  onLogout?: () => void
}

export default function KnowledgeHub({ initialRole = 0, onLogout }: KnowledgeHubProps) {
  console.log("🏗️ KnowledgeHub constructor - initialRole received:", initialRole)

  // Force re-initialization when initialRole changes
  const [activeRole, setActiveRole] = useState(() => {
    const validRole = typeof initialRole === "number" && initialRole >= 0 && initialRole <= 4 ? initialRole : 0
    console.log("🎯 KnowledgeHub - Initial activeRole set to:", validRole, "from initialRole:", initialRole)
    return validRole
  })

  const [showElevationModal, setShowElevationModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [pendingRole, setPendingRole] = useState({ name: "", index: -1 })

  // Force update activeRole when initialRole changes
  useEffect(() => {
    console.log("🔄 KnowledgeHub useEffect - initialRole changed to:", initialRole)
    if (typeof initialRole === "number" && initialRole >= 0 && initialRole <= 4) {
      console.log("✅ Updating activeRole from", activeRole, "to", initialRole)
      setActiveRole(initialRole)
    } else {
      console.log("⚠️ Invalid initialRole:", initialRole, "keeping activeRole:", activeRole)
    }
  }, [initialRole])

  // Debug activeRole changes
  useEffect(() => {
    console.log("🎭 activeRole state changed to:", activeRole)
  }, [activeRole])

  console.log("🖥️ KnowledgeHub render - initialRole:", initialRole, "activeRole:", activeRole)

  const userRoles = ["Employee (Reader)", "Contributor", "Reviewer/Moderator", "Admin", "Guest/Viewer"]
  const roleLabels = ["Employee (Reader)", "Contributor", "Reviewer/Moderator", "Admin", "Guest/Viewer"]

  const renderDashboard = () => {
    console.log("🎨 renderDashboard called with activeRole:", activeRole)

    switch (activeRole) {
      case 0:
        console.log("✅ Rendering Employee Dashboard")
        return (
          <div>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium">🔵 Employee Dashboard (Role Index: 0)</p>
              <p className="text-blue-600 text-sm">
                initialRole: {initialRole}, activeRole: {activeRole}
              </p>
            </div>
            <EmployeeDashboard />
          </div>
        )
      case 1:
        console.log("✅ Rendering Contributor Dashboard")
        return (
          <div>
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">🟢 Contributor Dashboard (Role Index: 1)</p>
              <p className="text-green-600 text-sm">
                initialRole: {initialRole}, activeRole: {activeRole}
              </p>
            </div>
            <ContributorDashboard />
          </div>
        )
      case 2:
        console.log("✅ Rendering Reviewer Dashboard")
        return (
          <div>
            <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-purple-800 font-medium">🟣 Reviewer Dashboard (Role Index: 2)</p>
              <p className="text-purple-600 text-sm">
                initialRole: {initialRole}, activeRole: {activeRole}
              </p>
            </div>
            <ReviewerDashboard />
          </div>
        )
      case 3:
        console.log("✅ Rendering Admin Dashboard")
        return (
          <div>
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">🔴 Admin Dashboard (Role Index: 3)</p>
              <p className="text-red-600 text-sm">
                initialRole: {initialRole}, activeRole: {activeRole}
              </p>
            </div>
            <AdminDashboard />
          </div>
        )
      case 4:
        console.log("✅ Rendering Guest Dashboard")
        return (
          <div>
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 font-medium">⚫ Guest Dashboard (Role Index: 4)</p>
              <p className="text-gray-600 text-sm">
                initialRole: {initialRole}, activeRole: {activeRole}
              </p>
            </div>
            <GuestDashboard />
          </div>
        )
      default:
        console.log("⚠️ Invalid role, rendering Employee Dashboard as fallback")
        return (
          <div>
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">⚠️ Fallback Employee Dashboard (Invalid Role: {activeRole})</p>
              <p className="text-yellow-600 text-sm">
                initialRole: {initialRole}, activeRole: {activeRole}
              </p>
            </div>
            <EmployeeDashboard />
          </div>
        )
    }
  }

  const handleRequestAccess = (targetRole: string, targetIndex: number) => {
    setPendingRole({ name: targetRole, index: targetIndex })
    setShowAccessModal(true)
  }

  const handleAccessGranted = () => {
    console.log("🔓 Access granted, switching to role:", pendingRole.index)
    setActiveRole(pendingRole.index)
    setPendingRole({ name: "", index: -1 })
  }

  const handleRoleChange = (newRoleIndex: number) => {
    console.log("🔄 Role change requested to:", newRoleIndex)
    setActiveRole(newRoleIndex)
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
                Knowledge Hub - {roleLabels[activeRole]} (Index: {activeRole})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher
              currentRole={activeRole}
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
        currentRole={roleLabels[activeRole]}
      />
      <RoleAccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        targetRole={pendingRole.name}
        currentRole={roleLabels[activeRole]}
        onAccessGranted={handleAccessGranted}
      />
    </div>
  )
}
