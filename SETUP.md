# 🔧 Email Setup Guide

## Resend Integration Setup

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month)
3. Verify your email address

### 2. Get API Key
1. Go to your Resend dashboard
2. Navigate to "API Keys"
3. Click "Create API Key"
4. Copy the API key (starts with `re_`)

### 3. Add Domain (Optional but Recommended)
1. In Resend dashboard, go to "Domains"
2. Add your domain (e.g., `yourdomain.com`)
3. Add the DNS records to your domain provider
4. Wait for verification

### 4. Environment Variables
Add to your `.env.local` file:

\`\`\`bash
# Resend API Key
RESEND_API_KEY=re_your_api_key_here
\`\`\`

### 5. Update Email From Address
In `app/api/auth/send-otp/route.ts`, update line 45:
\`\`\`typescript
from: 'BrainBox <noreply@yourdomain.com>', // Replace with your domain
\`\`\`

## 🧪 Testing

### With Resend (Real Emails):
1. Add `RESEND_API_KEY` to `.env.local`
2. Update the from address with your domain
3. Test with your real email address

### Demo Mode (No Real Emails):
1. Don't add `RESEND_API_KEY` (or leave it empty)
2. Check browser console for the OTP code
3. Use any 6-digit number as OTP

## 🔒 Security Features

- ✅ Rate limiting (3 attempts per hour per email)
- ✅ OTP expiration (10 minutes)
- ✅ Reset token expiration (30 minutes)
- ✅ Maximum verification attempts (5 tries)
- ✅ Secure token generation
- ✅ Input validation and sanitization

## 📧 Email Template Features

- ✅ Professional HTML design
- ✅ BrainBox branding
- ✅ Security warnings
- ✅ Mobile-responsive
- ✅ Dark theme styling
- ✅ Clear call-to-action

## 🚀 Production Considerations

1. **Database Storage**: Replace in-memory storage with Redis/database
2. **Rate Limiting**: Implement proper rate limiting middleware
3. **Logging**: Add comprehensive audit logging
4. **Monitoring**: Set up email delivery monitoring
5. **Templates**: Use Resend's template system for better management
