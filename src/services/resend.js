import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(recipent) {
  try {
    await resend.emails.send({
      from: 'SkyStore <no_reply_sky_store@resend.dev>',
      to: recipent,
      subject: 'Password Recovery',
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="https://yourdomain.com/reset?token=your-token">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>SkyStore Team</p>
      `
    });
    console.log('Email sent successfully to', recipent);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default sendEmail;