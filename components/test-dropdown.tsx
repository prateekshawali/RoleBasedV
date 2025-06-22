"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TestDropdown() {
  const handleClick = (item: string) => {
    console.log("Test dropdown clicked:", item)
    alert(`Clicked: ${item}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          Test Dropdown
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => handleClick("Item 1")}>Item 1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick("Item 2")}>Item 2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick("Item 3")}>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
