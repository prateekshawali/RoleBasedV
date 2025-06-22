"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SimpleTestDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    console.log("🔽 Simple test dropdown toggle:", !isOpen)
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item: string) => {
    console.log("✅ Simple test item clicked:", item)
    setIsOpen(false)
    alert(`Clicked: ${item}`)
  }

  return (
    <div className="relative">
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}

      {/* Trigger */}
      <Button variant="outline" className="gap-2" onClick={handleToggle}>
        Simple Test
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-1">
            <div
              onClick={() => handleItemClick("Item 1")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              Item 1
            </div>
            <div
              onClick={() => handleItemClick("Item 2")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              Item 2
            </div>
            <div
              onClick={() => handleItemClick("Item 3")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              Item 3
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
