import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(recipient, resetLink) {
  console.log("Attempting to send email to:", recipient);
  try {
    const data = await resend.emails.send({
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
    console.log("Email sent successfully to:", recipient, "Response:", data);
  } catch (error) {
    console.error("Error sending password reset email to", recipient, ":", error);
    throw new Error("Failed to send reset email");
  }
}

async function sendSharedFolderEmail(recipient, folderId) {
  console.log("Attempting to send shared folder email to:", recipient);
  try {
    const data = await resend.emails.send({
      from: 'SkyStore <no_reply_sky_store@resend.dev>',
      subject: 'Folder Shared with You',
      to: recipient,
      html: `
        <p>Hello,</p>
        <p>A folder has been shared with you. Click the link below to view it:</p>
        <a href="${process.env.FRONTEND_URL}/dashboard/folder/${folderId}">View Folder</a>
        <p>— SkyStore Team</p>
        <p><small>This is an automated message. Please do not reply.</small></p>
        `
    });
    console.log("Shared folder email sent successfully to:", recipient, "Response:", data);
  } catch (error) {
    console.error("Error sending shared folder email to", recipient, ":", error);
    throw new Error("Failed to send shared folder email");
  }
}

export { sendEmail, sendSharedFolderEmail };