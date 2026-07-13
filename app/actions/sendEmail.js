"use server"

import nodemailer from "nodemailer"
import { profile } from "@/data/profile"

/**
 * Server Action to handle contact form submissions and send an email using nodemailer.
 * Falls back to printing to the console in development if SMTP credentials are not configured.
 * 
 * @param {Object} data - The form data
 * @param {string} data.name - The sender's name
 * @param {string} data.email - The sender's email address
 * @param {string} data.subject - The message subject
 * @param {string} data.message - The message body
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendEmail({ name, email, subject, message }) {
  // 1. Basic server-side validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill out all required fields (Name, Email, and Message)."
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email address."
    }
  }

  // 2. Extract SMTP Configuration from Environment
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpSecure = process.env.SMTP_SECURE === "true"
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || profile.email

  // Check if SMTP is configured. If not, log to console (Dev mode/mock fallback)
  const isSmtpConfigured = smtpHost && smtpUser && smtpPass

  if (!isSmtpConfigured) {
    console.log("========================================")
    console.log("📧 NEW PORTFOLIO CONTACT MESSAGE (MOCK MODE)")
    console.log("----------------------------------------")
    console.log(`From:    ${name} <${email}>`)
    console.log(`Subject: ${subject || "(No Subject)"}`)
    console.log(`Date:    ${new Date().toLocaleString()}`)
    console.log("----------------------------------------")
    console.log("Message:")
    console.log(message)
    console.log("========================================")
    console.log("⚠️  SMTP is not configured. To send real emails, set the SMTP_* variables in .env.local")
    
    // Simulate a network latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      success: true,
      message: "Mock transmission successful. Check your server console logs for the message details!"
    }
  }

  // 3. Configure Nodemailer Transporter
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "465", 10),
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    const mailSubject = subject ? `Portfolio: ${subject}` : `New Message from ${name}`

    // 4. Premium HTML email layout
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f6f9fc;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              border: 1px solid #eef2f6;
            }
            .header {
              background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
              padding: 30px;
              text-align: center;
              color: #ffffff;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 800;
              letter-spacing: -0.5px;
            }
            .header p {
              margin: 5px 0 0 0;
              font-size: 14px;
              opacity: 0.9;
              font-family: monospace;
            }
            .content {
              padding: 30px;
            }
            .field-group {
              margin-bottom: 20px;
              border-bottom: 1px solid #f1f5f9;
              padding-bottom: 15px;
            }
            .field-group:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
            .label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #94a3b8;
              margin-bottom: 4px;
              letter-spacing: 1px;
            }
            .value {
              font-size: 16px;
              color: #1e293b;
            }
            .message-box {
              background-color: #f8fafc;
              border-left: 4px solid #4facfe;
              padding: 15px;
              border-radius: 0 8px 8px 0;
              white-space: pre-wrap;
              font-size: 15px;
              line-height: 1.6;
              color: #334155;
              margin-top: 5px;
            }
            .footer {
              background-color: #f8fafc;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #94a3b8;
              border-top: 1px solid #f1f5f9;
            }
            .footer a {
              color: #4facfe;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Message</h1>
              <p>TELEMETRY_PORTFOLIO_LOOP_INITIALIZED</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value"><strong>${name}</strong></div>
              </div>
              <div class="field-group">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Subject</div>
                <div class="value">${subject || "(No subject provided)"}</div>
              </div>
              <div class="field-group">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              This message was transmitted securely from your portfolio contact form. <br>
              You can reply directly to this email to contact <strong>${name}</strong>.
            </div>
          </div>
        </body>
      </html>
    `

    // 5. Send Email
    await transporter.sendMail({
      from: `"${name} (Portfolio Contact)" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email, // Extremely important so user replies to the sender, not the auth user
      subject: mailSubject,
      text: `Portfolio Contact Message\n\nFrom: ${name} (${email})\nSubject: ${subject || "(No Subject)"}\n\nMessage:\n${message}`,
      html: htmlContent
    })

    return {
      success: true,
      message: "Your message has been sent successfully!"
    }
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error)
    return {
      success: false,
      message: `Failed to transmit message: ${error.message || "Unknown SMTP error"}`
    }
  }
}
