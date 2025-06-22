"use client"

import { useState } from "react"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RoleElevationModalProps {
  isOpen: boolean
  onClose: () => void
  currentRole: string
}

export function RoleElevationModal({ isOpen, onClose, currentRole }: RoleElevationModalProps) {
  const [selectedRole, setSelectedRole] = useState("")
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("")
  const [purpose, setPurpose] = useState("")
  const [urgency, setUrgency] = useState("normal")

  const availableRoles = ["Contributor", "Reviewer/Moderator", "Admin"].filter((role) => role !== currentRole)

  const handleSubmit = () => {
    // Handle role elevation request
    console.log({
      selectedRole,
      reason,
      duration,
      purpose,
      urgency,
      requestedAt: new Date().toISOString(),
      currentRole,
    })

    // Show success message
    alert(
      `Role elevation request submitted!\n\nRole: ${selectedRole}\nDuration: ${duration}\nUrgency: ${urgency}\n\nYour request will be reviewed by administrators.`,
    )

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-600" />
            Request Role Elevation
          </DialogTitle>
          <DialogDescription>
            Request temporary access to a higher role for specific projects or learning purposes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="role">Requested Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1week">1 Week</SelectItem>
                <SelectItem value="2weeks">2 Weeks</SelectItem>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose/Project Details</Label>
            <Textarea
              id="purpose"
              placeholder="Describe the specific project or task requiring elevated access..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Request Urgency</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Can wait for approval</SelectItem>
                <SelectItem value="normal">Normal - Standard processing</SelectItem>
                <SelectItem value="high">High - Urgent business need</SelectItem>
                <SelectItem value="critical">Critical - Immediate access required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you need this role elevation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedRole || !reason || !duration || !purpose}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
