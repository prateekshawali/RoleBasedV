import { type NextRequest, NextResponse } from "next/server"
import { getResetToken, deleteOTP } from "@/lib/otp-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, resetToken, password } = await request.json()

    console.log("🔐 Password Reset Request:")
    console.log("  Email:", email)
    console.log("  Reset Token:", resetToken)

    if (!email || !resetToken || !password) {
      return NextResponse.json(
        { success: false, message: "Email, reset token, and password are required" },
        { status: 400 },
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const storedToken = getResetToken(normalizedEmail)

    console.log("🔍 Token Verification:")
    console.log("  Stored Token:", storedToken)
    console.log("  Submitted Token:", resetToken)
    console.log("  Match:", storedToken === resetToken)

    if (!storedToken || storedToken !== resetToken) {
      console.log("❌ Invalid or expired reset token for:", normalizedEmail)
      return NextResponse.json({ success: false, message: "Invalid or expired reset token" }, { status: 400 })
    }

    // Here you would update the password in your database
    // For demo purposes, we'll just simulate it
    console.log("🔐 Password would be updated for:", normalizedEmail)

    // Clean up reset token
    deleteOTP(`reset_${normalizedEmail}`)

    console.log("✅ Password reset successful for:", normalizedEmail)

    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    })
  } catch (error) {
    console.error("❌ Reset password error:", error)
    return NextResponse.json({ success: false, message: "Failed to reset password" }, { status: 500 })
  }
}
