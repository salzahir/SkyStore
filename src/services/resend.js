import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(recipient, resetLink) {
  try {
    await resend.emails.send({
      from: 'SkyStore <no_reply_sky_store@resend.dev>',
      to: recipient,
      subject: 'Password Recovery',
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>— SkyStore Team</p>
        <p><small>This is an automated message. Please do not reply.</small></p>
        `
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send reset email");
  }
}

export default sendEmail;