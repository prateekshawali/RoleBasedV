# Email Setup Guide

## 🚀 Quick Solutions

### Option 1: Add Verified Emails (Easiest)
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your friend's email to "Verified Recipients"
3. Add to `.env.local`:
   \`\`\`bash
   VERIFIED_EMAIL_1=your-email@gmail.com
   VERIFIED_EMAIL_2=friend-email@gmail.com
   VERIFIED_EMAIL_3=another-email@gmail.com
   \`\`\`

### Option 2: Verify Your Domain (Best for Production)
1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain (e.g., yourdomain.com)
3. Add DNS records as instructed
4. Update from address to: `BrainBox <noreply@yourdomain.com>`

### Option 3: Use Demo Mode (Current)
- Works for any email address
- Shows OTP in the UI instead of sending email
- Perfect for testing and development

## 🔧 Current Behavior

- **Your Resend email**: Gets real email ✅
- **Other emails**: Demo mode with OTP shown in UI ✅
- **No setup needed**: Works out of the box for testing

## 📧 Alternative Email Services

If you want to send to any email without verification:

### Nodemailer + Gmail (Free)
\`\`\`bash
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
\`\`\`

### SendGrid (Free tier)
\`\`\`bash
SENDGRID_API_KEY=your-sendgrid-key
\`\`\`

### Mailgun (Free tier)
\`\`\`bash
MAILGUN_API_KEY=your-mailgun-key
MAILGUN_DOMAIN=your-mailgun-domain
