"use client"

import { useState, useEffect } from "react"
import { Login } from "./components/login"
import { Signup } from "./components/signup"
import { ResetPassword } from "./components/reset-password"
import KnowledgeHub from "./knowledge-hub"

type AuthView = "login" | "signup" | "reset-password" | "dashboard"

export default function AuthWrapper() {
  const [currentView, setCurrentView] = useState<AuthView>("login")
  const [userRole, setUserRole] = useState<number>(0)

  // Add debugging for state changes
  useEffect(() => {
    console.log("🔄 AuthWrapper - userRole state changed to:", userRole)
  }, [userRole])

  const handleLogin = (role: string) => {
    console.log("🔑 handleLogin called with role:", role)

    const roleMap: { [key: string]: number } = {
      guest: 4, // Guest Dashboard
      employee: 0, // Employee Dashboard
      contributor: 1, // Contributor Dashboard
      reviewer: 2, // Reviewer Dashboard
      admin: 3, // Admin Dashboard
    }

    const normalizedRole = role.toLowerCase().trim()
    console.log("🧹 Normalized role:", normalizedRole)

    const mappedRole = roleMap[normalizedRole]
    console.log("🎯 Mapped role index:", mappedRole)

    if (mappedRole === undefined) {
      console.error("❌ Unknown role:", role, "Available roles:", Object.keys(roleMap))
      console.log("🔄 Setting userRole to 0 (Employee) as fallback")
      setUserRole(0)
    } else {
      console.log("✅ Setting userRole to:", mappedRole)
      setUserRole(mappedRole)
    }

    // Add a small delay to ensure state is set before navigation
    setTimeout(() => {
      console.log("📱 Navigating to dashboard with userRole:", mappedRole !== undefined ? mappedRole : 0)
      setCurrentView("dashboard")
    }, 100)
  }

  const handleLogout = () => {
    console.log("🚪 Logout - Resetting to login")
    setCurrentView("login")
    setUserRole(0)
  }

  console.log("🖥️ AuthWrapper render - currentView:", currentView, "userRole:", userRole)

  if (currentView === "dashboard") {
    console.log("🎨 Rendering KnowledgeHub with initialRole:", userRole)
    return <KnowledgeHub key={userRole} initialRole={userRole} onLogout={handleLogout} />
  }

  switch (currentView) {
    case "login":
      return (
        <div>
          <Login onLogin={handleLogin} onNavigate={setCurrentView} />
          <div className="fixed bottom-4 right-4 z-50 space-x-2">
            <button
              onClick={() => setCurrentView("signup")}
              className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => setCurrentView("reset-password")}
              className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              Reset Password
            </button>
          </div>
        </div>
      )
    case "signup":
      return (
        <div>
          <Signup onNavigate={setCurrentView} />
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setCurrentView("login")}
              className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      )
    case "reset-password":
      return (
        <div>
          <ResetPassword onSuccess={() => setCurrentView("login")} onNavigate={setCurrentView} />
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setCurrentView("login")}
              className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      )
    default:
      return <Login onLogin={handleLogin} onNavigate={setCurrentView} />
  }
}
