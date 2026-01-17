import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${import.meta.env.SITE || 'http://localhost:4321'}/auth/verify-email?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email',
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1a202c;">Confirm your email</h2>
        <p style="color: #4a5568;">Click the link below to verify your email address and join the AI Multi-Agent Studio.</p>
        <a href="${confirmLink}" style="display: inline-block; background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Verify Email</a>
        <p style="color: #a0aec0; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${import.meta.env.SITE || 'http://localhost:4321'}/auth/reset-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your password',
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1a202c;">Reset your password</h2>
        <p style="color: #4a5568;">Click the link below to reset your password for the AI Multi-Agent Studio.</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Reset Password</a>
        <p style="color: #a0aec0; font-size: 12px; margin-top: 30px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
    });
};
