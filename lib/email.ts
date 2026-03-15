import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Railway MS <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your RailConnect account',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #4f46e5; font-size: 24px; font-weight: 800; margin-bottom: 16px;">Welcome to RailConnect!</h2>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 24px;">Please use the following code to verify your account:</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 0.25em; color: #1f2937;">${code}</span>
          </div>
          <p style="color: #9ca3af; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send verification email:', err);
    return { success: false, error: err };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Railway MS <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your RailConnect password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #4f46e5; font-size: 24px; font-weight: 800; margin-bottom: 16px;">Password Reset Request</h2>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 24px;">Click the button below to reset your password. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #9ca3af; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send password reset email:', err);
    return { success: false, error: err };
  }
}
