// Simple file-based storage for OTP (works in serverless)
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

interface OTPData {
  otp: string
  expires: number
  attempts: number
}

interface OTPStore {
  [email: string]: OTPData
}

const OTP_FILE = join(process.cwd(), ".otp-store.json")

// Read OTP store from file
function readOTPStore(): OTPStore {
  try {
    if (existsSync(OTP_FILE)) {
      const data = readFileSync(OTP_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.log("📁 Creating new OTP store file")
  }
  return {}
}

// Write OTP store to file
function writeOTPStore(store: OTPStore): void {
  try {
    writeFileSync(OTP_FILE, JSON.stringify(store, null, 2))
  } catch (error) {
    console.error("❌ Failed to write OTP store:", error)
  }
}

// Clean expired OTPs
function cleanExpiredOTPs(store: OTPStore): OTPStore {
  const now = Date.now()
  const cleaned: OTPStore = {}

  for (const [email, data] of Object.entries(store)) {
    if (data.expires > now) {
      cleaned[email] = data
    }
  }

  return cleaned
}

export function storeOTP(email: string, otp: string, expiresIn: number = 10 * 60 * 1000): void {
  const store = readOTPStore()
  const cleanedStore = cleanExpiredOTPs(store)

  const normalizedEmail = email.toLowerCase().trim()
  cleanedStore[normalizedEmail] = {
    otp: otp.toString(),
    expires: Date.now() + expiresIn,
    attempts: 0,
  }

  writeOTPStore(cleanedStore)
  console.log("💾 OTP stored for:", normalizedEmail, "OTP:", otp)
}

export function getOTP(email: string): OTPData | null {
  const store = readOTPStore()
  const cleanedStore = cleanExpiredOTPs(store)

  const normalizedEmail = email.toLowerCase().trim()
  const data = cleanedStore[normalizedEmail]

  console.log("🔍 Getting OTP for:", normalizedEmail)
  console.log("📋 Available emails in store:", Object.keys(cleanedStore))
  console.log("🔍 Found data:", !!data)

  if (data) {
    console.log("📄 OTP data:", { otp: data.otp, expires: new Date(data.expires), attempts: data.attempts })
  }

  return data || null
}

export function updateOTPAttempts(email: string, attempts: number): void {
  const store = readOTPStore()
  const normalizedEmail = email.toLowerCase().trim()

  if (store[normalizedEmail]) {
    store[normalizedEmail].attempts = attempts
    writeOTPStore(store)
    console.log("📝 Updated attempts for:", normalizedEmail, "to:", attempts)
  }
}

export function deleteOTP(email: string): void {
  const store = readOTPStore()
  const normalizedEmail = email.toLowerCase().trim()

  delete store[normalizedEmail]
  writeOTPStore(store)
  console.log("🗑️ Deleted OTP for:", normalizedEmail)
}

export function storeResetToken(email: string, token: string, expiresIn: number = 30 * 60 * 1000): void {
  const store = readOTPStore()
  const normalizedEmail = email.toLowerCase().trim()

  store[`reset_${normalizedEmail}`] = {
    otp: token,
    expires: Date.now() + expiresIn,
    attempts: 0,
  }

  writeOTPStore(store)
  console.log("🔑 Reset token stored for:", normalizedEmail)
}

export function getResetToken(email: string): string | null {
  const store = readOTPStore()
  const normalizedEmail = email.toLowerCase().trim()
  const data = store[`reset_${normalizedEmail}`]

  if (data && data.expires > Date.now()) {
    return data.otp
  }

  return null
}
