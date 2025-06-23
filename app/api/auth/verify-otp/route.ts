import { type NextRequest, NextResponse } from "next/server"
import { getOTP, updateOTPAttempts, deleteOTP, storeResetToken } from "@/lib/otp-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    console.log("🔍 OTP Verification Request:")
    console.log("  Email:", email)
    console.log("  Submitted OTP:", otp)
    console.log("  OTP Type:", typeof otp)
    console.log("  OTP Length:", otp?.length)

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: "Email and OTP are required" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const normalizedOtp = otp.toString().trim()

    console.log("  Normalized Email:", normalizedEmail)
    console.log("  Normalized OTP:", normalizedOtp)

    const storedData = getOTP(normalizedEmail)

    if (!storedData) {
      console.log("❌ OTP not found for email:", normalizedEmail)
      return NextResponse.json({ success: false, message: "OTP not found. Please request a new one." }, { status: 404 })
    }

    // Check if OTP expired
    if (Date.now() > storedData.expires) {
      console.log("⏰ OTP expired for:", normalizedEmail)
      deleteOTP(normalizedEmail)
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 410 },
      )
    }

    // Check attempts (max 5 attempts)
    if (storedData.attempts >= 5) {
      console.log("🚫 Too many attempts for:", normalizedEmail)
      deleteOTP(normalizedEmail)
      return NextResponse.json(
        { success: false, message: "Too many failed attempts. Please request a new OTP." },
        { status: 429 },
      )
    }

    // Verify OTP
    const otpMatches = storedData.otp === normalizedOtp

    console.log("🔍 OTP Comparison:")
    console.log("  Stored OTP:", storedData.otp)
    console.log("  Submitted OTP:", normalizedOtp)
    console.log("  Match:", otpMatches)

    if (otpMatches) {
      // OTP is correct - generate reset token
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      // Store reset token
      storeResetToken(normalizedEmail, resetToken, 30 * 60 * 1000) // 30 minutes

      // Clean up OTP
      deleteOTP(normalizedEmail)

      console.log("✅ OTP verified successfully for:", normalizedEmail)
      console.log("🔑 Reset token generated:", resetToken)

      return NextResponse.json({
        success: true,
        message: "OTP verified successfully",
        resetToken,
      })
    } else {
      // Increment attempts
      updateOTPAttempts(normalizedEmail, storedData.attempts + 1)

      console.log("❌ Invalid OTP for:", normalizedEmail)
      console.log("  Attempts remaining:", 5 - (storedData.attempts + 1))

      return NextResponse.json(
        {
          success: false,
          message: `Invalid OTP. ${5 - (storedData.attempts + 1)} attempts remaining.`,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("❌ Verify OTP error:", error)
    return NextResponse.json({ success: false, message: "Failed to verify OTP" }, { status: 500 })
  }
}
