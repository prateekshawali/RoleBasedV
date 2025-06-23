import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { storeOTP } from "@/lib/otp-storage"

const resend = new Resend(process.env.RESEND_API_KEY)

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Check if email is allowed (for demo purposes)
function isEmailAllowed(email: string): boolean {
  // Add your verified emails here
  const allowedEmails = [
    process.env.VERIFIED_EMAIL_1, // Your Resend registered email
    process.env.VERIFIED_EMAIL_2, // Add more verified emails
    process.env.VERIFIED_EMAIL_3,
    // Add more as needed
  ].filter(Boolean)

  return allowedEmails.includes(email.toLowerCase())
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Send OTP API called")
    console.log("🔑 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)

    const { email } = await request.json()
    console.log("📧 Email requested:", email)

    if (!email || !email.includes("@")) {
      console.log("❌ Invalid email format")
      return NextResponse.json({ success: false, message: "Valid email is required" }, { status: 400 })
    }

    // Generate OTP
    const otp = generateOTP()
    console.log("🔢 Generated OTP:", otp, "for email:", email)

    // Store OTP using file-based storage
    storeOTP(email, otp, 10 * 60 * 1000) // 10 minutes

    // Check if we can send real emails
    const canSendRealEmail = process.env.RESEND_API_KEY && isEmailAllowed(email)

    if (canSendRealEmail) {
      console.log("📤 Attempting to send email via Resend to verified email...")

      try {
        const emailResult = await resend.emails.send({
          from: "BrainBox <onboarding@resend.dev>",
          to: [email],
          subject: "🔐 Your BrainBox Password Reset Code",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%); color: white; border-radius: 10px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #00ff00; margin: 0; font-size: 28px;">🧠 BrainBox</h1>
                <p style="color: #888; margin: 5px 0;">Knowledge Hub Platform</p>
              </div>
              
              <div style="background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h2 style="color: #00ff00; margin: 0 0 15px 0;">🔐 Password Reset Request</h2>
                <p style="color: #ccc; margin: 0 0 20px 0;">You requested to reset your password. Use the verification code below:</p>
                
                <div style="text-align: center; margin: 25px 0;">
                  <div style="display: inline-block; background: rgba(0, 255, 0, 0.2); border: 2px solid #00ff00; border-radius: 8px; padding: 15px 25px;">
                    <span style="font-size: 32px; font-weight: bold; color: #00ff00; letter-spacing: 8px; font-family: monospace;">${otp}</span>
                  </div>
                </div>
                
                <p style="color: #888; font-size: 14px; margin: 20px 0 0 0; text-align: center;">
                  ⏰ This code expires in 10 minutes<br>
                  🔒 Keep this code secure and don't share it with anyone
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This email was sent by BrainBox Knowledge Hub<br>
                  © 2024 BrainBox. All rights reserved.
                </p>
              </div>
            </div>
          `,
          text: `
BrainBox - Password Reset Code

Your verification code is: ${otp}

This code expires in 10 minutes.
If you didn't request this, please ignore this email.

- BrainBox Team
          `,
        })

        console.log("✅ Email sent successfully via Resend:", emailResult)

        return NextResponse.json({
          success: true,
          message: "OTP sent successfully to your email",
          demo: false,
          emailId: emailResult.data?.id,
        })
      } catch (emailError) {
        console.error("❌ Resend email error:", emailError)

        // Fall back to demo mode
        console.log("🔄 Falling back to demo mode due to email error")
        return NextResponse.json({
          success: true,
          message: `Demo Mode: OTP is ${otp} (Email service restricted)`,
          demo: true,
          demoOtp: otp,
          reason: "Email not verified with Resend or sending failed",
        })
      }
    } else {
      // Demo mode for unverified emails
      console.log("📧 Demo mode - Email not verified or no API key")
      console.log("🔢 Demo OTP for", email, ":", otp)

      return NextResponse.json({
        success: true,
        message: `Demo Mode: Your OTP is ${otp}`,
        demo: true,
        demoOtp: otp,
        reason: process.env.RESEND_API_KEY ? "Email not verified with Resend" : "No email service configured",
      })
    }
  } catch (error) {
    console.error("❌ Send OTP error:", error)
    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 })
  }
}
