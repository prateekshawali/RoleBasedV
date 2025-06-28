"use client"

import { useState } from "react"
import { Login } from "./components/login"
import { Signup } from "./components/signup"
import { ResetPassword } from "./components/reset-password"
import { KnowledgeHub } from "./knowledge-hub"

export default function AuthWrapper() {
  const [currentView, setCurrentView] = useState("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("employee")

  const handleLogin = (role) => {
    setUserRole(role)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView("login")
  }

  const roleMap = {
    guest: 4, // Guest Dashboard
    employee: 0, // Employee Dashboard
    contributor: 1, // Contributor Dashboard
    reviewer: 2, // Reviewer Dashboard
    admin: 3, // Admin Dashboard
  }

  if (isAuthenticated) {
    return <KnowledgeHub key={`hub-${userRole}`} initialRole={roleMap[userRole]} onLogout={handleLogout} />
  }

  return (
    <div>
      {currentView === "login" && <Login onLogin={handleLogin} onNavigate={setCurrentView} />}
      {currentView === "signup" && <Signup onNavigate={setCurrentView} />}
      {currentView === "reset-password" && <ResetPassword onNavigate={setCurrentView} />}
    </div>
  )
}
