import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 Test email API called")
    console.log("🔑 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("🔑 RESEND_API_KEY value:", process.env.RESEND_API_KEY?.substring(0, 10) + "...")

    const { email } = await request.json()
    console.log("📧 Test email requested for:", email)

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "Valid email is required" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "RESEND_API_KEY not configured",
          debug: {
            hasApiKey: false,
            envVars: Object.keys(process.env).filter((key) => key.includes("RESEND")),
          },
        },
        { status: 400 },
      )
    }

    try {
      const emailResult = await resend.emails.send({
        from: "BrainBox Test <onboarding@resend.dev>",
        to: [email],
        subject: "🧪 BrainBox Email Test",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f0f0f0;">
            <h1 style="color: #00ff00;">🧪 Email Test Successful!</h1>
            <p>This is a test email from BrainBox to verify email sending is working.</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>To:</strong> ${email}</p>
            <p style="color: #666; font-size: 12px;">If you received this, email sending is working correctly!</p>
          </div>
        `,
        text: `Email Test Successful! Time: ${new Date().toISOString()}, To: ${email}`,
      })

      console.log("✅ Test email sent successfully:", emailResult)

      return NextResponse.json({
        success: true,
        message: "Test email sent successfully",
        emailId: emailResult.data?.id,
        debug: {
          hasApiKey: true,
          emailResult: emailResult.data,
        },
      })
    } catch (emailError) {
      console.error("❌ Test email error:", emailError)

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send test email",
          error: emailError instanceof Error ? emailError.message : "Unknown error",
          debug: {
            hasApiKey: true,
            errorType: emailError instanceof Error ? emailError.constructor.name : typeof emailError,
          },
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ Test email API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "API error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
